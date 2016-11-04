import pip
import os
import sys
from setuptools import setup
from setuptools.command.test import test as TestCommand
from setuptools.command.install import install
reqs = open('./requirements.txt', 'r').read().split('\n')


class OverrideInstall(install):

    """
    Emulate sequential install of pip install -r requirements.txt
    To fix numpy bug in scipy, scikit in py2
    """

    def run(self):
        for req in reqs:
            if req:
                pip.main(["install", "-U", req])


# explicitly config
test_args = [
    '--cov-report=term',
    '--cov-report=html',
    '--cov=src',
    'test'
]


class PyTest(TestCommand):
    user_options = [('pytest-args=', 'a', "Arguments to pass to py.test")]

    def initialize_options(self):
        TestCommand.initialize_options(self)
        self.pytest_args = test_args

    def run_tests(self):
        # import here, cause outside the eggs aren't loaded
        import pytest
        errno = pytest.main(self.pytest_args)
        sys.exit(errno)


# Utility function to read the README file.
def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()


# the setup
setup(
    name='psi',
    version='1.0.0',
    description='The horsemen are getting back to work. New trading project Psi.',
    long_description=read('README.md'),
    keywords='psi',
    url='https://github.com/kengz/psi.git',
    author='kengz, johnkmj, yinghang, lacunadream',
    license='UNLICENSED',
    packages=[],
    zip_safe=False,
    include_package_data=True,
    install_requires=[],
    dependency_links=[],
    extras_require={
        'dev': [],
        'docs': [],
        'testing': []
    },
    classifiers=[],
    tests_require=['pytest', 'pytest-cov'],
    test_suite='test',
    cmdclass={'test': PyTest, 'install': OverrideInstall}
)
