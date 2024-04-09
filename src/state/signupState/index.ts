import React, { createContext } from 'react'
import profileStore from './profileStore'

// Context 생성, 기본값으로 스토어 인스턴스 전달
const ProfileStoreContext = createContext(profileStore)

export const useProfileStore = () => React.useContext(ProfileStoreContext)
