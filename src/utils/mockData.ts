// Mock data utilities for energy monitoring application

// Generate random energy consumption values between min and max
export const generateRandomConsumption = (min: number, max: number): number => {
  return +(Math.random() * (max - min) + min).toFixed(1);
};

// Generate daily energy consumption data for a month
export const generateMonthlyData = (month: number, year: number, baseValue: number = 2.5, variance: number = 1.5) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const currentDate = new Date();
  const isCurrentMonth = currentDate.getMonth() === month - 1 && currentDate.getFullYear() === year;
  const currentDay = isCurrentMonth ? currentDate.getDate() : daysInMonth;
  
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    // Only generate data up to the current day of the month if it's the current month
    if (isCurrentMonth && day > currentDay) {
      return {
        day,
        date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        consumption: null,
        cost: null
      };
    }
    
    let consumption = generateRandomConsumption(baseValue - variance, baseValue + variance);
    
    // Add weekday patterns
    if (day % 7 === 0 || day % 7 === 6) {
      // Weekend: typically higher consumption
      consumption *= 1.2;
    }
    
    // Add some trend (slight increase during middle of month)
    if (day > 10 && day < 20) {
      consumption *= 1.1;
    }
    
    const cost = +(consumption * 5).toFixed(2);
    
    return {
      day,
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      consumption: +consumption.toFixed(1),
      cost
    };
  });
};

// Generate current and previous month data
export const getCurrentMonthData = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  
  let previousMonth = currentMonth - 1;
  let previousYear = currentYear;
  
  if (previousMonth === 0) {
    previousMonth = 12;
    previousYear = currentYear - 1;
  }
  
  const currentMonthData = generateMonthlyData(currentMonth, currentYear, 2.5, 1);
  // Previous month had slightly higher consumption
  const previousMonthData = generateMonthlyData(previousMonth, previousYear, 3.2, 1.2);
  
  return {
    currentMonthData,
    previousMonthData,
    currentMonth,
    currentYear,
    previousMonth,
    previousYear
  };
};

// Get appliance data
export const getApplianceData = () => {
  return [
    {
      id: 1,
      name: 'Air Conditioner',
      wattage: 1200,
      dailyUsageHours: 5,
      dailyEnergy: 6.0,
      monthlyEnergy: 180,
      monthlyCost: 900,
      percentOfTotal: 40
    },
    {
      id: 2,
      name: 'Refrigerator',
      wattage: 150,
      dailyUsageHours: 24,
      dailyEnergy: 3.6,
      monthlyEnergy: 108,
      monthlyCost: 540,
      percentOfTotal: 24
    },
    {
      id: 3,
      name: 'LED TV',
      wattage: 100,
      dailyUsageHours: 6,
      dailyEnergy: 0.6,
      monthlyEnergy: 18,
      monthlyCost: 90,
      percentOfTotal: 4
    },
    {
      id: 4,
      name: 'Water Heater',
      wattage: 1500,
      dailyUsageHours: 2,
      dailyEnergy: 3.0,
      monthlyEnergy: 90,
      monthlyCost: 450,
      percentOfTotal: 20
    },
    {
      id: 5,
      name: 'Washing Machine',
      wattage: 500,
      dailyUsageHours: 1,
      dailyEnergy: 0.5,
      monthlyEnergy: 15,
      monthlyCost: 75,
      percentOfTotal: 3.3
    },
    {
      id: 6,
      name: 'Laptop',
      wattage: 65,
      dailyUsageHours: 8,
      dailyEnergy: 0.52,
      monthlyEnergy: 15.6,
      monthlyCost: 78,
      percentOfTotal: 3.5
    },
    {
      id: 7,
      name: 'Ceiling Fan',
      wattage: 75,
      dailyUsageHours: 10,
      dailyEnergy: 0.75,
      monthlyEnergy: 22.5,
      monthlyCost: 112.5,
      percentOfTotal: 5
    }
  ];
};

// Calculate energy summary
export const calculateEnergySummary = (data: any[]) => {
  // Filter out null values (future days)
  const validData = data.filter(item => item.consumption !== null);
  
  const totalConsumption = validData.reduce((sum, day) => sum + day.consumption, 0);
  const totalCost = validData.reduce((sum, day) => sum + day.cost, 0);
  const daysCompleted = validData.length;
  
  const dailyAvgConsumption = daysCompleted > 0 ? +(totalConsumption / daysCompleted).toFixed(1) : 0;
  const dailyAvgCost = daysCompleted > 0 ? +(totalCost / daysCompleted).toFixed(2) : 0;
  
  return {
    totalConsumption: +totalConsumption.toFixed(1),
    totalCost: +totalCost.toFixed(2),
    daysCompleted,
    dailyAvgConsumption,
    dailyAvgCost
  };
};

// Calculate forecast based on current consumption
export const calculateForecast = (currentData: any[], monthLength: number = 30, budgetAmount: number = 3000) => {
  const summary = calculateEnergySummary(currentData);
  const daysRemaining = monthLength - summary.daysCompleted;
  
  const forecastedRemainingConsumption = summary.dailyAvgConsumption * daysRemaining;
  const forecastedTotalConsumption = summary.totalConsumption + forecastedRemainingConsumption;
  const forecastedTotalCost = summary.totalCost + (summary.dailyAvgCost * daysRemaining);
  
  const isOverBudget = forecastedTotalCost > budgetAmount;
  const dailySavingsNeeded = isOverBudget
    ? ((forecastedTotalCost - budgetAmount) / 5) / daysRemaining
    : 0;
  
  return {
    forecastedTotalConsumption: +forecastedTotalConsumption.toFixed(1),
    forecastedTotalCost: +forecastedTotalCost.toFixed(2),
    isOverBudget,
    dailySavingsNeeded: +dailySavingsNeeded.toFixed(1),
    daysRemaining
  };
};

// Calculate rewards based on energy savings
export const calculateRewards = (currentData: any[], previousData: any[]) => {
  const currentSummary = calculateEnergySummary(currentData);
  const previousSummary = calculateEnergySummary(previousData);
  
  // Only compare equal number of days
  const daysToCompare = Math.min(currentSummary.daysCompleted, previousSummary.daysCompleted);
  
  const currentConsumption = currentData
    .filter(item => item.consumption !== null)
    .slice(0, daysToCompare)
    .reduce((sum, day) => sum + day.consumption, 0);
    
  const previousConsumption = previousData
    .filter(item => item.consumption !== null)
    .slice(0, daysToCompare)
    .reduce((sum, day) => sum + day.consumption, 0);
  
  const energySaved = previousConsumption - currentConsumption;
  const moneySaved = energySaved * 5;
  
  // Calculate consecutive days of savings
  let consecutiveSavingDays = 0;
  let maxConsecutiveDays = 0;
  
  for (let i = 1; i < daysToCompare; i++) {
    if (currentData[i].consumption < currentData[i-1].consumption) {
      consecutiveSavingDays++;
      maxConsecutiveDays = Math.max(maxConsecutiveDays, consecutiveSavingDays);
    } else {
      consecutiveSavingDays = 0;
    }
  }
  
  const rewardPoints = Math.max(0, Math.round(energySaved));
  
  const badges = [
    {
      id: 'budget-master',
      name: 'Budget Master',
      description: 'Stay under the monthly budget',
      achieved: currentSummary.totalCost < 3000,
      icon: '💰'
    },
    {
      id: 'daily-saver',
      name: 'Daily Saver',
      description: 'Save energy compared to yesterday',
      achieved: currentData.length > 1 && 
        currentData[currentData.length - 1].consumption < currentData[currentData.length - 2].consumption,
      icon: '⚡'
    },
    {
      id: 'consistent-saver',
      name: 'Consistent Saver',
      description: 'Save energy for 7 continuous days',
      achieved: maxConsecutiveDays >= 7,
      icon: '🏆'
    },
    {
      id: 'eco-warrior',
      name: 'Eco Warrior',
      description: 'Save at least 10% energy compared to last month',
      achieved: energySaved > 0 && (energySaved / previousConsumption) > 0.1,
      icon: '🌱'
    }
  ];
  
  return {
    energySaved: +energySaved.toFixed(1),
    moneySaved: +moneySaved.toFixed(2),
    rewardPoints,
    badges,
    consecutiveSavingDays: maxConsecutiveDays
  };
};

// Generate hourly data for appliance based on usage patterns
export const generateHourlyData = (appliance: { wattage: number, dailyUsageHours: number, name: string }) => {
  const hourlyData = [];
  const { wattage, dailyUsageHours, name } = appliance;
  
  // Determine active hours based on appliance type and daily usage
  let startHour = 0;
  let peakHours = [];
  
  // Different appliances have different usage patterns
  switch (name.toLowerCase()) {
    case 'air conditioner':
      // AC typically used during afternoon/evening
      startHour = 12;
      peakHours = [14, 15, 16, 17, 18, 19];
      break;
    case 'refrigerator':
      // Refrigerator runs throughout the day with higher usage during meal times
      startHour = 0;
      peakHours = [7, 8, 12, 13, 18, 19];
      break;
    case 'led tv':
    case 'tv':
      // TVs typically used in evening
      startHour = 18;
      peakHours = [19, 20, 21];
      break;
    case 'water heater':
      // Water heater typically used in morning and evening
      startHour = 6;
      peakHours = [7, 8, 19, 20];
      break;
    case 'washing machine':
      // Washing machine typically used in morning or evening
      startHour = Math.random() > 0.5 ? 8 : 18;
      peakHours = startHour === 8 ? [9, 10] : [19, 20];
      break;
    case 'laptop':
    case 'computer':
      // Computers typically used during work hours
      startHour = 9;
      peakHours = [10, 11, 14, 15, 16];
      break;
    case 'ceiling fan':
    case 'fan':
      // Fans typically used during afternoon/night
      startHour = 13;
      peakHours = [14, 15, 16, 22, 23];
      break;
    default:
      // Default pattern for other appliances
      startHour = 8;
      peakHours = [9, 10, 18, 19];
  }
  
  // Calculate hourly energy consumption
  for (let hour = 0; hour < 24; hour++) {
    let usageFactor = 0;
    
    // For appliances that run 24 hours (like refrigerator)
    if (dailyUsageHours >= 24) {
      // Base consumption with some variance
      usageFactor = peakHours.includes(hour) ? 0.7 : 0.3;
    } else {
      // For appliances with specific usage hours
      const hoursRange = dailyUsageHours > 12 ? 16 : Math.ceil(dailyUsageHours * 1.5);
      const activeHourEnd = (startHour + hoursRange) % 24;
      
      // Check if this hour is within the active range
      const isActive = (hour >= startHour && hour < activeHourEnd) || 
                       (activeHourEnd < startHour && (hour >= startHour || hour < activeHourEnd));
                      
      if (isActive) {
        usageFactor = peakHours.includes(hour) ? 0.9 : 0.5;
      }
    }
    
    // Add some randomness to the usage factor
    usageFactor *= (0.85 + Math.random() * 0.3);
    
    // Calculate hourly consumption in kWh
    const hourlyConsumption = (wattage * usageFactor) / 1000;
    
    hourlyData.push({
      hour,
      consumption: +hourlyConsumption.toFixed(3)
    });
  }
  
  return hourlyData;
};
