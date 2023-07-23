import NextImage from 'next/image'
import React from 'react'

const Image = ({ ...rest }: React.ComponentProps<typeof NextImage>) => <NextImage {...rest} />

export default Image