
import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { calculateRewards, getCurrentMonthData } from '@/utils/mockData';

const Rewards = () => {
  const [rewards, setRewards] = useState({
    energySaved: 0,
    moneySaved: 0,
    rewardPoints: 0,
    badges: [],
    consecutiveSavingDays: 0
  });
  const [pointsGoal, setPointsGoal] = useState(100);

  useEffect(() => {
    const { currentMonthData, previousMonthData } = getCurrentMonthData();
    const rewardsData = calculateRewards(currentMonthData, previousMonthData);
    setRewards(rewardsData);
  }, []);

  const motivationalQuotes = [
    "Every kilowatt-hour saved is a step towards a sustainable future.",
    "Small changes in energy habits lead to big savings over time.",
    "Energy efficiency is the easiest path to financial and environmental well-being.",
    "Saving energy today ensures resources for tomorrow.",
  ];

  // Select a random quote
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <AppLayout>
      <AppHeader />
      
      <div className="space-y-6">
        <Card className="energy-card bg-gradient-to-r from-energy-primary/10 to-energy-secondary/10">
          <CardHeader>
            <CardTitle>Energy Rewards Program</CardTitle>
            <CardDescription>Earn points and badges by saving energy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <div className="w-24 h-24 rounded-full bg-energy-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-energy-primary">{rewards.rewardPoints}</span>
              </div>
              <h2 className="text-2xl font-bold">Reward Points</h2>
              <p className="text-muted-foreground mt-2">
                1 kWh saved = 1 Reward Point
              </p>
              
              <div className="mt-6">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Progress to next reward</span>
                  <span>{rewards.rewardPoints}/{pointsGoal} points</span>
                </div>
                <Progress 
                  value={rewards.rewardPoints} 
                  max={pointsGoal}
                  className="h-2"
                >
                  <div 
                    className="h-full bg-energy-primary"
                    style={{ width: `${(rewards.rewardPoints / pointsGoal) * 100}%` }}
                  />
                </Progress>
                <p className="text-sm text-muted-foreground mt-2">
                  {Math.max(0, pointsGoal - rewards.rewardPoints)} more points to earn a ₹{pointsGoal} discount on your next bill!
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-energy-light rounded-lg">
                <p className="italic">"{randomQuote}"</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="energy-card">
            <CardHeader>
              <CardTitle>Energy Saved</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <span className="text-4xl font-bold text-energy-primary">
                {rewards.energySaved.toFixed(1)} kWh
              </span>
              <p className="text-muted-foreground mt-2">
                Compared to last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="energy-card">
            <CardHeader>
              <CardTitle>Money Saved</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <span className="text-4xl font-bold text-energy-success">
                ₹{rewards.moneySaved.toFixed(2)}
              </span>
              <p className="text-muted-foreground mt-2">
                At ₹5 per kWh
              </p>
            </CardContent>
          </Card>
          
          <Card className="energy-card">
            <CardHeader>
              <CardTitle>Consecutive Days</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <span className="text-4xl font-bold text-energy-accent">
                {rewards.consecutiveSavingDays}
              </span>
              <p className="text-muted-foreground mt-2">
                Days of continuous energy savings
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="energy-card">
          <CardHeader>
            <CardTitle>Earned Badges</CardTitle>
            <CardDescription>Achievement badges for your energy-saving efforts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {rewards.badges && rewards.badges.map((badge: any) => (
                <div 
                  key={badge.id} 
                  className={`p-4 rounded-lg border ${badge.achieved ? 'bg-energy-light border-energy-primary' : 'bg-muted/30 border-muted text-muted-foreground'}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-2">{badge.icon}</span>
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-sm mt-1">{badge.description}</p>
                    <Badge 
                      variant="outline" 
                      className={`mt-3 ${badge.achieved ? 'bg-energy-success/20 text-energy-success' : 'bg-muted'}`}
                    >
                      {badge.achieved ? 'Achieved' : 'Locked'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="energy-card">
          <CardHeader>
            <CardTitle>Redeem Rewards</CardTitle>
            <CardDescription>Use your points for discounts and benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">₹50 Bill Discount</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Redeem 50 points for a ₹50 discount on your next energy bill
                </p>
                <Badge 
                  variant="outline" 
                  className={`mt-3 ${rewards.rewardPoints >= 50 ? 'bg-energy-primary/20 text-energy-primary' : 'bg-muted'}`}
                >
                  {rewards.rewardPoints >= 50 ? 'Available' : `${rewards.rewardPoints}/50 points`}
                </Badge>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">₹100 Bill Discount</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Redeem 100 points for a ₹100 discount on your next energy bill
                </p>
                <Badge 
                  variant="outline" 
                  className={`mt-3 ${rewards.rewardPoints >= 100 ? 'bg-energy-primary/20 text-energy-primary' : 'bg-muted'}`}
                >
                  {rewards.rewardPoints >= 100 ? 'Available' : `${rewards.rewardPoints}/100 points`}
                </Badge>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Smart Power Strip</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Redeem 200 points for a smart power strip to reduce standby power
                </p>
                <Badge 
                  variant="outline" 
                  className={`mt-3 ${rewards.rewardPoints >= 200 ? 'bg-energy-primary/20 text-energy-primary' : 'bg-muted'}`}
                >
                  {rewards.rewardPoints >= 200 ? 'Available' : `${rewards.rewardPoints}/200 points`}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Rewards;
