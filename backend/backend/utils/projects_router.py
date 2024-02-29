class ProjectsRouter:

    """
    A router to control all database operations on models in the
    projects application.
    """
    nonrel_models = {'projects'}

    def db_for_read(self, model, **hints):
        """
        Attempts to read projects models go to projects.
        """
        if model._meta.app_label == 'projects':
            return 'projectsDB'
        return None
    
    def db_for_write(self, model, **hints):
        """
        Attempts to write projects models go to projects.
        """
        if model._meta.app_label == 'projects':
            return 'projectsDB'
        return None
    
    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the projects app is involved.
        """
        if obj1._meta.app_label == 'projects' or \
           obj2._meta.app_label == 'projects':
           return True
        # No opinion if neither object is in the Example app (defer to default or other routers).
        elif 'projects' not in [obj1._meta.app_label, obj2._meta.app_label]:
            return None
        return None
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the projects app only appears in the 'projects'
        database.
        """
        if app_label == 'projects':
            return db == 'projectsDB'
        elif db == 'projectsDB':
            # Ensure that all other apps don't get migrated on the notificationsDB database.
            return False

        # No opinion for all other scenarios
        return None