class AccountsRouter:

    """
    A router to control all database operations on models in the
    notifications application.
    """
    
    def db_for_read(self, model, **hints):
        """
        Attempts to read notifications models go to notifications.
        """
        if model._meta.app_label == 'jectamDB':
            return 'jectamDB'
        return None
    
    def db_for_write(self, model, **hints):
        """
        Attempts to write notifications models go to notifications.
        """
        if model._meta.app_label == 'jectamDB':
            return 'jectamDB'
        return None
    
    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the notifications app is involved.
        """
        if obj1._meta.app_label == 'jectamDB' or \
           obj2._meta.app_label == 'jectamDB':
           return True
        return None
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the accounts app only appears in the 'notifications'
        database.
        """
        if app_label == 'jectamDB':
            return db == 'jectamDB'
        return None