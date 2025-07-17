import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { setUser } from '../../services/slices/auth-slice';
import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user?.name, user?.email]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');
    setSuccessText('');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setErrorText('Токен не найден. Войдите заново.');
      return;
    }

    try {
      const res = await fetch(
        'https://norma.nomoreparties.space/api/auth/user',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({
            name: formValue.name,
            email: formValue.email,
            password: formValue.password
          })
        }
      );

      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
        setSuccessText('Данные успешно обновлены');
        setFormValue((prev) => ({
          ...prev,
          password: ''
        }));
      } else {
        setErrorText(data.message || 'Ошибка при обновлении');
      }
    } catch (err) {
      setErrorText('Ошибка сети. Попробуйте позже.');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
    setErrorText('');
    setSuccessText('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      errorText={errorText}
      successText={successText}
    />
  );
};
