class ReportsAndAnalyticsRouter:

    """
    A router to control all database operations on models in the
    reports_and_analytics application.
    """
    route_app_labels = ['reports_and_analytics']
    
    def db_for_read(self, model, **hints):
        """
        Attempts to read reports_and_analytics models go to reports_and_analytics.
        """
        if model._meta.app_label in self.route_app_labels:
            return 'randaDB'
        return None
    
    def db_for_write(self, model, **hints):
        """
        Attempts to write reports_and_analytics models go to reports_and_analytics.
        """
        if model._meta.app_label in self.route_app_labels:
            return 'randaDB'
        return None
    
    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the reports_and_analytics app is involved.
        """
        if obj1._meta.app_label == 'reports_and_analytics' or \
           obj2._meta.app_label == 'reports_and_analytics':
           return True
        return None
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the reports_and_analytics app only appears in the 'reports_and_analytics'
        database.
        """
        if app_label in self.route_app_labels:
            return db == 'randaDB'
        elif db == 'randaDB':
            # Ensure that all other apps don't get migrated on the notificationsDB database.
            return False

        # No opinion for all other scenarios
        return None