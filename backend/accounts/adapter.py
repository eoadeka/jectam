from allauth.account.adapter import DefaultAccountAdapter


class CustomuserAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.email = data.get('email')
        user.department = data.get('department')
        user.university = data.get('university')
        user.save()