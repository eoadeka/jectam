class CommentsRouter:

    """
    A router to control all database operations on models in the
    comments application.
    """
    nonrel_models = {'comments'}

    def db_for_read(self, model, **hints):
        """
        Attempts to read comments models go to comments.
        """
        if model._meta.app_label == 'comments':
            return 'commentsDB'
        return None
    
    def db_for_write(self, model, **hints):
        """
        Attempts to write comments models go to comments.
        """
        if model._meta.app_label == 'comments':
            return 'commentsDB'
        return None
    
    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the comments app is involved.
        """
        if obj1._meta.app_label == 'comments' or \
           obj2._meta.app_label == 'comments':
           return True
        # No opinion if neither object is in the Example app (defer to default or other routers).
        elif 'comments' not in [obj1._meta.app_label, obj2._meta.app_label]:
            return None
        return None
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the comments app only appears in the 'comments'
        database.
        """
        if app_label == 'comments':
            return db == 'commentsDB'
        elif db == 'commentsDB':
            # Ensure that all other apps don't get migrated on the notificationsDB database.
            return False

        # No opinion for all other scenarios
        return None