.PHONY: install test run clean

# Install dependencies
install:
	python -m pip install -r requirements.txt

# Run tests
test:
	python -m pytest -q

# Run the application
run:
	python src/main.py

# Clean generated files
clean:
	rm -rf __pycache__
	rm -rf .pytest_cache