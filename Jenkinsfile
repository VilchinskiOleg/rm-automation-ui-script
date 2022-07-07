pipeline {
    agent any
    tool {
        nodejs '18.4.0'
    }
    stages {
        stage('Run script') {
            steps {
                npm version
                pwd
                ls -a
                ./node_modules/.bin/wdio run wdio.conf.js
            }
        }
    }
}