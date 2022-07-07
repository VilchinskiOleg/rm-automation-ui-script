pipeline {
    agent any

    stages {

        stage('Run script') {

            steps {

                nodejs('18.4.0') {
                    sh '''./node_modules/.bin/wdio run wdio.conf.js'''
                }
            }
        }
    }
}