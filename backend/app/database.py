fake_users_db = {}

def get_user_by_email(email: str):
    return fake_users_db.get(email)
