import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { BoardDetails } from './pages/BoardDetails'
import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg.jsx'
import { TaskDetails } from './pages/TaskDetails.jsx'
import { BoardCreate } from './cmps/BoardCreate.jsx'
import { AppLayout } from './AppLayout'
import { loadBoards } from './store/actions/board.actions.js'
import { Auth } from './pages/Auth.jsx'

export function RootCmp() {
	const user = useSelector(storeState => storeState.userModule.user)
	const userId = user ? user._id : null

	// The board API needs a login. Load boards only once someone is logged
	// in (the header logs visitors in as Guest), never before.
	useEffect(() => {
		if (!userId) return
		loadBoards()
	}, [userId])

	return (
		<div className="main-container">
			<UserMsg />
			<main className='full'>
				<Routes>
					<Route element={<Auth />} path="/login" />
					<Route element={<Auth />} path="/signup" />
					<Route path="/" element={<>
						<AppHeader isHomePage={true} />
						<HomePage />
					</>} />
					<Route element={<AppLayout isHomePage={false} />}>
						<Route path="board" element={<BoardIndex />}>
							<Route path="add" element={<BoardCreate />} />
						</Route>
						<Route path="board/:boardId" element={<BoardDetails />}>
							<Route path=":groupId/:taskId" element={<TaskDetails />} />
						</Route>
					</Route>
				</Routes>
			</main>
		</div>
	)
}
