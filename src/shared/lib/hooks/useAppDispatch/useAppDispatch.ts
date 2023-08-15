import { AppDispatch } from 'app/providers/StoreProvider';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => { return useDispatch<AppDispatch>(); };
