import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/slices/auth-slice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(registerUser({ email, password, name: userName }))
      .unwrap()
      .then(() => {
        navigate('/profile');
      })
      .catch((err) => {
        console.error('Ошибка при регистрации:', err);
        setErrorText(
          'Ошибка при регистрации. Проверьте данные и попробуйте снова.'
        );
      });
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
