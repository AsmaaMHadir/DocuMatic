import { Buffer } from 'buffer';

export const decodeBase64 = (data) => {
    return Buffer.from(data, 'base64').toString('utf8');
}

export const processPath = (filePath) =>{
    const parts = filePath.split("/");
  
    // Get the last element in the array
    const lastPart = parts[parts.length - 1];
    
    // Check if the last part ends with ".py" and the path contains directories
    if (parts.length > 1 && lastPart.endsWith(".py")) {
      return lastPart;
    } else {
      return filePath;
    }
}

export function getKeyByValue(object, targetValue) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key] === targetValue) {
      return key;
    }
  }
  return null; // Return null if the value is not found
}

export const cleanCodeArray = (codeArray) => {

  // Clean up each code snippet
  const cleanedCodeArray = codeArray
    .filter((codeSnippet) => codeSnippet.trim() !== '') // Remove empty code snippets
    .map((codeSnippet) => codeSnippet.trim()) // Trim leading and trailing whitespace
    .join('\n'); // Join the lines with newline characters

  return cleanedCodeArray;
}

const codeArray = [
  '',
  'from django.contrib import admin\n' +
    'from .models import Record\n' +
    '\n' +
    'admin.site.register(Record)',
  '"""\n' +
    'ASGI config for crm project.\n' +
    '\n' +
    'It exposes the ASGI callable as a module-level variable named ``application``.\n' +
    '\n' +
    'For more information on this file, see\n' +
    'https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/\n' +
    '"""\n' +
    '\n' +
    'import os\n' +
    '\n' +
    'from django.core.asgi import get_asgi_application\n' +
    '\n' +
    "os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crm.settings')\n" +
    '\n' +
    'application = get_asgi_application()\n',
  'from django.db import models\n' +
    '\n' +
    '\n' +
    'class Record(models.Model):\n' +
    '    \n' +
    '    created_at = models.DateTimeField(auto_now_add=True)\n' +
    '    fname = models.CharField(max_length=50)\n' +
    '    lname = models.CharField(max_length=50)\n' +
    '    email = models.CharField(max_length=100)\n' +
    '    phone = models.CharField(max_length=15)\n' +
    '    address = models.CharField(max_length=100)\n' +
    '    city = models.CharField(max_length=50)\n' +
    '    state = models.CharField(max_length=50)\n' +
    '    zipcode = models.CharField(max_length=20)\n' +
    '    \n' +
    '    def __str__(self):\n' +
    '        return(f"{self.fname} {self.lname}") ',
  'from django.contrib.auth.forms import UserCreationForm\n' +
    'from django.contrib.auth.models import User\n' +
    'from django import forms\n' +
    'from .models import Record\n' +
    '\n' +
    ' \n' +
    'class SignUpForm(UserCreationForm):\n' +
    '    \n' +
    `    email = forms.EmailField(label="", widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Email Address'}))\n` +
    `    fname = forms.CharField(label="", max_length=100 , widget=forms.TextInput(attrs={'class':'form-control','placeholder':'First Name'}))\n` +
    `    lname = forms.CharField(label="", max_length=100, widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Last Name'}))\n` +
    '    \n' +
    '    class Meta:\n' +
    '        model = User\n' +
    "        fields = ('username','fname','lname','email','password1','password2')\n" +
    '        \n' +
    '        \n' +
    '\n' +
    '        def __init__(self, *args, **kwargs):\n' +
    '            super(SignUpForm, self).__init__(*args, **kwargs)\n' +
    '\n' +
    "            self.fields['username'].widget.attrs['class'] = 'form-control'\n" +
    "            self.fields['username'].widget.attrs['placeholder'] = 'User Name'\n" +
    "            self.fields['username'].label = ''\n" +
    `            self.fields['username'].help_text = '<span class="form-text text-muted"><small>Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</small></span>'\n` +
    '\n' +
    "            self.fields['password1'].widget.attrs['class'] = 'form-control'\n" +
    "            self.fields['password1'].widget.attrs['placeholder'] = 'Password'\n" +
    "            self.fields['password1'].label = ''\n" +
    `            self.fields['password1'].help_text = '<ul class="form-text text-muted small"><li>Your password can\\'t be too similar to your other personal information.</li><li>Your password must contain at least 8 characters.</li><li>Your password can\\'t be a commonly used password.</li><li>Your password can\\'t be entirely numeric.</li></ul>'\n` +
    '\n' +
    "            self.fields['password2'].widget.attrs['class'] = 'form-control'\n" +
    "            self.fields['password2'].widget.attrs['placeholder'] = 'Confirm Password'\n" +
    "            self.fields['password2'].label = ''\n" +
    `            self.fields['password2'].help_text = '<span class="form-text text-muted"><small>Enter the same password as before, for verification.</small></span>'\t\n` +
    '\n' +
    '\n' +
    'class AddRecordForm(forms.ModelForm):\n' +
    '    \n' +
    '    fname = forms.CharField(required=True, widget=forms.TextInput(attrs={"placeholder":"First Name","class":"form-control"}),label="")\n' +
    '    lname = forms.CharField(required=True, widget=forms.TextInput(attrs={"placeholder":"Last Name","class":"form-control"}),label="")\n' +
    '    email = forms.CharField(required=True, widget=forms.TextInput(attrs={"placeholder":"Email","class":"form-control"}),label="")\n' +
    '    phone = forms.CharField(required=True, widget=forms.TextInput(attrs={"placeholder":"Phone","class":"form-control"}),label="")\n' +
    '    address = forms.CharField(required=True, widget=forms.TextInput(attrs={"placeholder":"Address","class":"form-control"}),label="")\n' +
    '    city = forms.CharField(required=True, widget=forms.TextInput(attrs={"placeholder":"City","class":"form-control"}),label="")\n' +
    '    state =  forms.CharField(required=True, widget=forms.TextInput(attrs={"placeholder":"State","class":"form-control"}),label="")\n' +
    '    zipcode = forms.CharField(required=True, widget=forms.TextInput(attrs={"placeholder":"Zip Code","class":"form-control"}),label="")\n' +
    '    \n' +
    '    \n' +
    '    class Meta:\n' +
    '        \n' +
    '        model = Record\n' +
    '        exclude = ("user",)\n' +
    '        \n' +
    '        \n',
  '"""\n' +
    'WSGI config for crm project.\n' +
    '\n' +
    'It exposes the WSGI callable as a module-level variable named ``application``.\n' +
    '\n' +
    'For more information on this file, see\n' +
    'https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/\n' +
    '"""\n' +
    '\n' +
    'import os\n' +
    '\n' +
    'from django.core.wsgi import get_wsgi_application\n' +
    '\n' +
    "os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crm.settings')\n" +
    '\n' +
    'application = get_wsgi_application()\n',
  '"""\n' +
    'Django settings for crm project.\n' +
    '\n' +
    "Generated by 'django-admin startproject' using Django 4.2.4.\n" +
    '\n' +
    'For more information on this file, see\n' +
    'https://docs.djangoproject.com/en/4.2/topics/settings/\n' +
    '\n' +
    'For the full list of settings and their values, see\n' +
    'https://docs.djangoproject.com/en/4.2/ref/settings/\n' +
    '"""\n' +
    '\n' +
    'from pathlib import Path\n' +
    'from decouple import config\n' +
    "# Build paths inside the project like this: BASE_DIR / 'subdir'.\n" +
    'BASE_DIR = Path(__file__).resolve().parent.parent\n' +
    '\n' +
    '\n' +
    '# Quick-start development settings - unsuitable for production\n' +
    '# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/\n' +
    '\n' +
    '# SECURITY WARNING: keep the secret key used in production secret!\n' +
    "SECRET_KEY = 'django-insecure-3q#$()*^-@oe778acgb$xdi43jqc=uog)cjq$wstcqn+@p$!s4'\n" +
    '\n' +
    "# SECURITY WARNING: don't run with debug turned on in production!\n" +
    'DEBUG = True\n' +
    '\n' +
    'ALLOWED_HOSTS = []\n' +
    '\n' +
    '\n' +
    '# Application definition\n' +
    '\n' +
    'INSTALLED_APPS = [\n' +
    "    'django.contrib.admin',\n" +
    "    'django.contrib.auth',\n" +
    "    'django.contrib.contenttypes',\n" +
    "    'django.contrib.sessions',\n" +
    "    'django.contrib.messages',\n" +
    "    'django.contrib.staticfiles',\n" +
    "    'crm',\n" +
    ']\n' +
    '\n' +
    'MIDDLEWARE = [\n' +
    "    'django.middleware.security.SecurityMiddleware',\n" +
    "    'django.contrib.sessions.middleware.SessionMiddleware',\n" +
    "    'django.middleware.common.CommonMiddleware',\n" +
    "    'django.middleware.csrf.CsrfViewMiddleware',\n" +
    "    'django.contrib.auth.middleware.AuthenticationMiddleware',\n" +
    "    'django.contrib.messages.middleware.MessageMiddleware',\n" +
    "    'django.middleware.clickjacking.XFrameOptionsMiddleware',\n" +
    ']\n' +
    '\n' +
    "ROOT_URLCONF = 'crm.urls'\n" +
    '\n' +
    'TEMPLATES = [\n' +
    '    {\n' +
    "        'BACKEND': 'django.template.backends.django.DjangoTemplates',\n" +
    "        'DIRS': [],\n" +
    "        'APP_DIRS': True,\n" +
    "        'OPTIONS': {\n" +
    "            'context_processors': [\n" +
    "                'django.template.context_processors.debug',\n" +
    "                'django.template.context_processors.request',\n" +
    "                'django.contrib.auth.context_processors.auth',\n" +
    "                'django.contrib.messages.context_processors.messages',\n" +
    '            ],\n' +
    '        },\n' +
    '    },\n' +
    ']\n' +
    '\n' +
    "WSGI_APPLICATION = 'crm.wsgi.application'\n" +
    '\n' +
    '\n' +
    '# Database\n' +
    '# https://docs.djangoproject.com/en/4.2/ref/settings/#databases\n' +
    '\n' +
    'DATABASES = {\n' +
    "    'default': {\n" +
    "        'ENGINE': 'django.db.backends.postgresql',\n" +
    "        'NAME': config('DATABASE_NAME'),\n" +
    "        'USER': config('DATABASE_USER'), \n" +
    "        'PASSWORD': config('DATABASE_PASSWORD'),\n" +
    "        'HOST': 'containers-us-west-76.railway.app', \n" +
    "        'PORT': '7265',\n" +
    '    }\n' +
    '}\n' +
    '\n' +
    '\n' +
    '# Password validation\n' +
    '# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators\n' +
    '\n' +
    'AUTH_PASSWORD_VALIDATORS = [\n' +
    '    {\n' +
    "        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',\n" +
    '    },\n' +
    '    {\n' +
    "        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',\n" +
    '    },\n' +
    '    {\n' +
    "        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',\n" +
    '    },\n' +
    '    {\n' +
    "        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',\n" +
    '    },\n' +
    ']\n' +
    '\n' +
    '\n' +
    '# Internationalization\n' +
    '# https://docs.djangoproject.com/en/4.2/topics/i18n/\n' +
    '\n' +
    "LANGUAGE_CODE = 'en-us'\n" +
    '\n' +
    "TIME_ZONE = 'UTC'\n" +
    '\n' +
    'USE_I18N = True\n' +
    '\n' +
    'USE_TZ = True\n' +
    '\n' +
    '\n' +
    '# Static files (CSS, JavaScript, Images)\n' +
    '# https://docs.djangoproject.com/en/4.2/howto/static-files/\n' +
    '\n' +
    "STATIC_URL = 'static/'\n" +
    '\n' +
    '# Default primary key field type\n' +
    '# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field\n' +
    '\n' +
    "DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'\n",
  '#!/usr/bin/env python\n' +
    `"""Django's command-line utility for administrative tasks."""\n` +
    'import os\n' +
    'import sys\n' +
    '\n' +
    '\n' +
    'def main():\n' +
    '    """Run administrative tasks."""\n' +
    "    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crm.settings')\n" +
    '    try:\n' +
    '        from django.core.management import execute_from_command_line\n' +
    '    except ImportError as exc:\n' +
    '        raise ImportError(\n' +
    `            "Couldn't import Django. Are you sure it's installed and "\n` +
    '            "available on your PYTHONPATH environment variable? Did you "\n' +
    '            "forget to activate a virtual environment?"\n' +
    '        ) from exc\n' +
    '    execute_from_command_line(sys.argv)\n' +
    '\n' +
    '\n' +
    "if __name__ == '__main__':\n" +
    '    main()\n',
  '"""\n' +
    'URL configuration for crm project.\n' +
    '\n' +
    'The `urlpatterns` list routes URLs to views. For more information please see:\n' +
    '    https://docs.djangoproject.com/en/4.2/topics/http/urls/\n' +
    'Examples:\n' +
    'Function views\n' +
    '    1. Add an import:  from my_app import views\n' +
    "    2. Add a URL to urlpatterns:  path('', views.home, name='home')\n" +
    'Class-based views\n' +
    '    1. Add an import:  from other_app.views import Home\n' +
    "    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')\n" +
    'Including another URLconf\n' +
    '    1. Import the include() function: from django.urls import include, path\n' +
    "    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))\n" +
    '"""\n' +
    'from . import views\n' +
    'from django.contrib import admin\n' +
    'from django.urls import path, include \n' +
    '\n' +
    'urlpatterns = [\n' +
    '    \n' +
    "    path('admin/', admin.site.urls),\n" +
    "    path('',views.home,name='home'),\n" +
    "    #path('login/',views.login_user,name='login'),\n" +
    "    path('logout/',views.logout_user,name='logout'),\n" +
    "    path('register/',views.register_user,name='register'),\n" +
    "    path('record/<int:pk>',views.client_record,name='record'),\n" +
    "    path('delete_record/<int:pk>',views.delete_record,name='delete'),\n" +
    "    path('add_record',views.add_record,name='add'),\n" +
    "    path('update_record/<int:pk>',views.update_record,name='update'),\n" +
    '\n' +
    ']\n',
  'from django.shortcuts import render, redirect\n' +
    'from django.contrib.auth import authenticate, login, logout\n' +
    'from django.contrib import messages \n' +
    'from .form import SignUpForm, AddRecordForm\n' +
    'from .models import Record\n' +
    '\n' +
    'def home(request):\n' +
    '    \n' +
    '    records = Record.objects.all()\n' +
    '    \n' +
    "    if request.method == 'POST':\n" +
    "        username = request.POST['username']\n" +
    "        password = request.POST['password']\n" +
    '        \n' +
    '        user = authenticate(request, username=username, password=password)\n' +
    '        \n' +
    '        if user is not None:\n' +
    '            login(request,user)\n' +
    '            messages.success(request, "You have been logged in")\n' +
    "            return redirect('home')\n" +
    '        else:\n' +
    '             messages.success(request,"There was an error loggin in, please try again.")\n' +
    "             return redirect('home')\n" +
    '    else:\n' +
    "        return render(request,'home.html',{'records':records})\n" +
    '\n' +
    '\n' +
    'def login_user(request):\n' +
    '    pass\n' +
    '\n' +
    'def logout_user(request):\n' +
    '    logout(request)\n' +
    '    messages.success(request,"You have been logged out..")\n' +
    "    return redirect('home')\n" +
    '\n' +
    'def register_user(request):\n' +
    '    \n' +
    "    if request.method == 'POST':\n" +
    '        form = SignUpForm(request.POST)\n' +
    '        if form.is_valid():\n' +
    '            form.save()\n' +
    '            \n' +
    "            username = form.cleaned_data['username']\n" +
    "            password = form.cleaned_data['password1']\n" +
    '            user = authenticate(username=username,password=password)\n' +
    '            login(request, user)\n' +
    '            messages.success(request,"You successfully registered")\n' +
    "            return redirect('home')\n" +
    '    else:\n' +
    '            form = SignUpForm()\n' +
    "            return render(request,'register.html',{'form':form})\n" +
    "    return render(request,'register.html',{'form':form})\n" +
    '\n' +
    '\n' +
    'def client_record(request,pk):\n' +
    '    \n' +
    '    if request.user.is_authenticated:\n' +
    '        \n' +
    '        crecord = Record.objects.get(id=pk)\n' +
    "        return render(request,'record.html',{'crecord':crecord})\n" +
    '    \n' +
    '    else:\n' +
    `        messages.success(request,"You need to be logged in to view this customer's record")\n` +
    '        return redirect("home")\n' +
    '    \n' +
    'def delete_record(request, pk):\n' +
    '    \n' +
    '    if request.user.is_authenticated:\n' +
    '        delete_it = Record.objects.get(id=pk)\n' +
    '        delete_it.delete()\n' +
    '        messages.success(request,"Record deleted Successfully..")\n' +
    "        return redirect('home')\n" +
    '    \n' +
    '    else:\n' +
    '        messages(request,"You Must be logged in first...")\n' +
    "        return redirect('home')\n" +
    '\n' +
    '    \n' +
    'def add_record(request):\n' +
    '    form = AddRecordForm(request.POST or None)\n' +
    '    if request.user.is_authenticated:\n' +
    "        if request.method == 'POST':\n" +
    '            if form.is_valid():\n' +
    '                form.save()\n' +
    '                messages.success(request, "Record Added")\n' +
    "                return redirect('home')\n" +
    "        return render(request,'add_record.html',{'form':form})\n" +
    '    else:\n' +
    '        messages.success(request,"You need to be logged in first")\n' +
    "        return redirect('home')\n" +
    '   \n' +
    'def update_record(request,pk):\n' +
    '    if request.user.is_authenticated:\n' +
    '        currentRecord = Record.objects.get(id=pk)\n' +
    '        form = AddRecordForm(request.POST or None, instance=currentRecord)\n' +
    '        if form.is_valid():\n' +
    '            form.save()\n' +
    '            messages.success(request, "Record Updated!")\n' +
    "            return redirect('home')\n" +
    `        return render(request,"update_record.html",{'form':form})\n` +
    '    \n' +
    '    else:\n' +
    '        messages.success(request,"You Must be Logged In first")\n' +
    "        return redirect('home')"
];


console.log(cleanCodeArray(codeArray));