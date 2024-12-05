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
    <div className='p-12 overflow-auto'>
        <div className='flex flex-col space-y-4'>
            <div id='card-1'>
                <Card className='bg-[#A67B5B] text-white'>
                    <CardHeader>
                        <CardTitle className='font-bold text-lg'>Daily Verse</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DailyVerse />
                    </CardContent>
                </Card>
            </div>

            <div id='card-2'>
                <Card className='bg-[#A67B5B] text-white'>
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
                <Card className='bg-[#A67B5B] text-white'>
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
