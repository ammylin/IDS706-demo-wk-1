# Software Engineering Basics Demo

A small Python project for practicing virtual environments, dependencies,
Makefiles, tests, and GitHub Actions.

## Setup

Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the project dependencies:

```bash
make install
```

## Run

Run the demo:

```bash
make run
```

Run the tests:

```bash
make test
```

The test suite also runs automatically through GitHub Actions on pushes and
pull requests.