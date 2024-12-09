import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DailyVerse from '../daily/DailyVerse';

const Statistics = () => {
  return (
    <div className='overflow-auto'>
        <div className='flex flex-col space-y-4 lg:max-w-[80%]'>
            <div id='card-1'>
                <Card>
                    <CardHeader>
                        <CardTitle className='font-bold text-lg'>Daily Verse</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DailyVerse />
                    </CardContent>
                </Card>
            </div>

            <div id='card-2'>
                <Card>
                    <CardHeader>
                        <CardTitle className='font-bold text-lg'>Leaderboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='font-semibold'>You are ranked <span className='text-green-400'>#2</span></p>
                        <p>Keep it up to stay in the top 4!</p>
                    </CardContent>
                </Card>
            </div>

            <div id='card-3'>
                <Card>
                    <CardHeader>
                        <CardTitle className='font-bold text-lg'>Daily Quests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='mb-4'>- Extend your streak</p>
                        <p className='mb-4'>- Score 90% or higher in 2 quizzes</p>
                        <p className=''>- Earn 200 XP</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
};

export default Statistics;
