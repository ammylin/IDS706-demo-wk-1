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

## Demonstrate GitHub Actions

1. Commit and push the repository to GitHub.
2. Open the repository's **Actions** tab.
3. Select **Python tests**.
4. Select **Run workflow**, choose the `main` branch, and run it.
5. Open the workflow run to show the install and test steps.

To demonstrate a failing workflow, temporarily change the expected result in
`tests/test_main.py`, push the change, and then restore it after showing the
failed run.

## Run the interactive lab

The lab is a static site made with HTML, CSS, and vanilla JavaScript. Open
`index.html` directly in a browser, or serve the repository locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Push the repository to GitHub.
2. Open the repository's **Settings** tab.
3. Select **Pages** in the left sidebar.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then click **Save**.
6. Open the published URL shown by GitHub Pages.

GitHub Pages serves `index.html` from the repository root. No backend or build
step is required.