from src.main import welcome_message


def test_welcome_message():
    assert welcome_message("Ammy") == "Ammy, welcome to the Data Engineering course."