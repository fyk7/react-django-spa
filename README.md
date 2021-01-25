# react-django-spa

## ReactとDjango(rest_framework)を用いたSPAデモ

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
  - [useSelector, useDispatch](https://github.com/fyk7/react-django-spa/blob/main/frontend/src/features/fianncialnews/financialnewsSlice.js)
  
- JWT authentication
  - [Separate pages for logged-in and non-logged-in users.](https://github.com/fyk7/react-django-spa/blob/main/frontend/src/routes.js)

- designs
  - material-ui
  - formik, Yup



## Django features
- django_rest_framework
  - [JWT authentication(djoser, corsheader)](https://github.com/fyk7/react-django-spa/blob/main/backend/config/settings_common.py) 
  - Serializer
  - APIView

- settings file for several enviroments
  - [common, development, production](https://github.com/fyk7/react-django-spa/tree/main/backend/config)

- customized user
  - [customized user model](https://github.com/fyk7/react-django-spa/blob/main/backend/api/models.py)
  - [customized admin site](https://github.com/fyk7/react-django-spa/blob/main/backend/api/admin.py)
  
- create mew command for fetch news(python manage.py <command>)
  - [command script](https://github.com/fyk7/react-django-spa/blob/main/backend/api/management/commands/update_news.py)
  - [update news scritp](https://github.com/fyk7/react-django-spa/blob/main/backend/api/management/utils/bloomberg.py)
  - use crontab (once an hour)
  - use Serializer for validation


