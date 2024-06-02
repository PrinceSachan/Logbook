import React from 'react'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className='h-screen w-screen bg-landingImg bg-contain bg-right bg-no-repeat'>
            <div className='px-10 py-20'>
                <div className='text-landingText leading-none'>
                    <span className='block'>Human</span>
                    <span className='block pt-1'>stories & ideas</span>
                </div>
                <div className='pt-10 text-2xl tracking-wide'>
                    A place to read, write and deepen your undertanding
                </div>
                <div className='pt-10'>
                <Button 
                    children='Get started' 
                    type='button' 
                    onClick={() => navigate('/signin')}
                    className={'rounded-full bg-gray-900 py-2.5 px-10 text-lg font-light'} 
                />
                </div>
            </div>
        </div>
    )
}

export default Landing