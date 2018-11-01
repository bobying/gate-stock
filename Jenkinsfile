#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh "java -version"
    }

    stage('clean') {
        sh "chmod +x mvnw"
        sh "./mvnw clean"
    }

    stage('install tools') {
        sh "./mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-yarn -DnodeVersion=v8.12.0 -DyarnVersion=v1.10.1"
    }

    stage('yarn install') {
        sh "./mvnw com.github.eirslett:frontend-maven-plugin:yarn"
    }

    stage('backend tests') {
        try {
            sh "./mvnw test"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/surefire-reports/TEST-*.xml'
        }
    }

    stage('frontend tests') {
        try {
            sh "./mvnw com.github.eirslett:frontend-maven-plugin:yarn -Dfrontend.yarn.arguments='test -u'"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/test-results/jest/TESTS-*.xml'
        }
    }

    stage('packaging') {
        sh "./mvnw verify -Pprod -DskipTests"
        archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
    }

    def dockerImage
    stage('build docker') {
        sh "cp -R src/main/docker target/"
        sh "cp target/*.war target/docker/"
        dockerImage = docker.build('cloud/gate', 'target/docker')
    }

    stage('publish docker') {
        docker.withRegistry('https://docker.eyun.online:9082', 'docker-login') {
            dockerImage.push 'latest'
        }
    }
}
