import type { AppDispatch, RootState } from '@/redux/redux-store'
import { useDispatch, useSelector } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()