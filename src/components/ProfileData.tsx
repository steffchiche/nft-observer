'use client'
import { useEffect, useState } from 'react'

export const ProfileData = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<any>(undefined)

	useEffect(() => {
		fetch('/api')
			.then(res => res.json())
			.then(data => {
				setData(data)
				setIsLoading(false)
			})
	}, [])

	return (
		<>
			<div>User: Test</div>
			<div>Balance: 1000ETH</div>
		</>
	)
}
