import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface LogoProps {
    width: number,
    height: number,
    variant?: "black" | "blue" | "white"
}

const Logo = ({
    width,
    height,
    variant
}: LogoProps) => {

    return (
    <Link href="/">
        <Image
            src={   
                variant == "blue" || !variant ? "/logos/bg-white-var-blue.svg" :
                variant == "black" ? "/logos/bg-white-var-black.svg" :
                "/logos/bg-black-var-white"
            }
            alt="Logo"
            width={width}
            height={height}            
            priority
        >
        </Image>
        
    </Link>
    )
}

export default Logo