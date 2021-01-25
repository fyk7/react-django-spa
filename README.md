# react-django-spa

## Django(django_rest_framework)とReactを用いたSPA

## Django features
- django_rest_framework
  - [JWT authentication(djoser, corsheader)](https://github.com/fyk7/react-django-spa/blob/main/backend/config/settings_common.py) 
  - Serializer
  - APIView

- settings file for several enviroments
  - [settings_common](https://github.com/fyk7/react-django-spa/blob/main/backend/config/settings_common.py), [settings_dev](https://github.com/fyk7/react-django-spa/blob/main/backend/config/settings_dev.py), [settings](https://github.com/fyk7/react-django-spa/blob/main/backend/config/settings.py)
  - django-environ

- customized user
  - [customized user model](https://github.com/fyk7/react-django-spa/blob/main/backend/api/models.py)
  - [customized admin site](https://github.com/fyk7/react-django-spa/blob/main/backend/api/admin.py)
  
- create mew command for fetch news(python manage.py <command>)
  - [command script](https://github.com/fyk7/react-django-spa/blob/main/backend/api/management/commands/update_news.py)
  - [update news script](https://github.com/fyk7/react-django-spa/blob/main/backend/api/management/utils/bloomberg.py)
  - use crontab (once an hour)
  - use Serializer for validation


## React features
- react basics
  - useState
  - useEffect
  - functional components 
  - react-router-dom
  - axios
  
- redux toolkit (react-redux)
  - [store](https://github.com/fyk7/react-django-spa/blob/main/frontend/src/app/store.js)
  - [createSlice, createAsyncThunk](https://github.com/fyk7/react-django-spa/blob/main/frontend/src/features/auth/authSlice.js)
  - [useSelector, useDispatch](https://github.com/fyk7/react-django-spa/blob/main/frontend/src/features/fianncialnews/index.js)
  
- JWT authentication
  - [Separate pages for logged-in and non-logged-in users.](https://github.com/fyk7/react-django-spa/blob/main/frontend/src/routes.js)

- designs
  - material-ui
  - formik, Yup

