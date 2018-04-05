pipeline {
  tools {
    nodejs 'NODE_891'
  }

  agent { label 'coel7_agent&&dccdvtp006_agent' }

  stages {
    stage('Test') {
      steps {
        ansiColor('xterm') {
          sh 'sudo yum install -y gnu-free-sans-fonts' // needed for Chrome headless
          withEnv(["PATH=${env.PATH}:./node_modules/.bin"]) {
            sh 'ls -la'
            sh 'npm -version'
            sh 'npm config set registry http://registry.npmjs.org'
            sh 'npm install'
            sh 'ng test --single-run --code-coverage'
            sh 'ng lint'
            sh 'ng e2e -e=protractor'
            sh 'ng build'
            sh 'cp dist/index.html dist/index.html.bak'
          }
        }
      }
      post {
        success {
          publishHTML allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'coverage', reportFiles: 'index.html', reportName: 'Code Coverage Report', reportTitles: ''
          publishHTML allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: '.', reportFiles: 'unitTestReport.html', reportName: 'Unit Test Report', reportTitles: ''
          cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: 'coverage/cobertura*.xml', conditionalCoverageTargets: '80, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
        }
      }
    }
    stage('Deploy dev') {
      when {
        branch 'develop'
      }
      steps {
        deployTo('dev')
      }
    }
    stage('Deploy sqa') {
      when {
        branch 'develop'
      }
      steps {
        askForPermissionAndDeploy('sqa')
      }
    }
    stage('Deploy staging') {
      when {
        branch 'master'
      }
      steps {
        deployTo('staging')
      }
    }
    stage('Deploy loadtesting') {
      when {
        branch 'master'
      }
      steps {
        askForPermissionAndDeploy('loadtesting')
      }
    }
    stage('Deploy prod') {
      when {
        branch 'master'
      }
      steps {
        askForPermissionAndDeploy('prod')
      }
    }
  }
}

def restore() {
  sh 'cp dist/index.html.bak dist/index.html'
}

def replaceBaseUrl(env) {
  sh 'sed -i.bak s:\\<base\\ href=\\"/\\"\\>:\\<base\\ href=\\"/all/eca-my-app-name-ui/\\"\\>:g dist/index.html'
}

def setupUrls(env) {
  restore()
  replaceBaseUrl(env)
}

def setupConfig(env) {

  def client = 'TABE'
  def clientLower = 'tabe'

  def longform = [
    'dev': 'development',
    'sqa': 'sqa',
    'staging': 'staging',
    'loadtesting': 'loadtesting',
    'prod': 'production'
  ]
  def environment = longform[env]

  def configJson = readJSON( file: 'dist/config.json')

  // readJSON returns a JSONObject (or JSONArray, depending on file content)
  // we can edit the key/value pairs or add new ones with .put
  // unfortunately, strings stored here with interpolation tokens will remain representations of an INTERPOLATION string instead of a real string
  // so we concatenate an empty string at the beginning of each, to force the issue. Kthxbai.

  configJson["client"] = client
  configJson["portalHeaderLibUrl"] = "" + "https://cdn-app-${env}.drcedirect.com/eca-portal-header-lib/latest/eca-portal-header-lib.js"
  configJson["myAppNameWebApi"] = "" + "https://api-gateway-cloud-${env}.drcedirect.com/my-app-name-web-api/${clientLower}-${environment}-v0"
  configJson["securityServiceApi"] = "" + "https://api-gateway-${env}.drcedirect.com/eca-security-service/all-${environment}-v0"
  writeJSON( file: 'dist/config.json', json: configJson, pretty: 2 )

}

def askForPermissionAndDeploy(env) {
  def deployOptions = timeout(time: 20, unit: 'MINUTES') {
    input(
      id: "deployTo${env}",
      message: "Deploy to ${env} or abort?",
      submitter: "cseibert,jszusz",
      parameters:[
        [$class: 'StringParameterDefinition', defaultValue: '', description: 'Approve deploy? Type "yes" to proceed', name: 'deploy']
      ],
      ok: 'Deploy!'
    )
  }

  if (!deployOptions.equalsIgnoreCase('yes')) {
    currentBuild.result = 'ABORTED'
    error('Did not receive explicit approval, please retry and type "yes" in approval box.')
  }

  deployTo(env)
}

def deployTo(env) {
  setupUrls(env)
  setupConfig(env)
  withEnv(getCredentials()) {
    s3Upload(
      bucket: "cdn-app-${env}.drcedirect.com/all",
      file: 'dist',
      path: "eca-my-app-name-ui/",
      cacheControl: 'no-cache'
    )
  }
}

def getCredentials() {
  props = readProperties file: '/var/lib/jenkins/properties/AWS_Build.properties'
  [
    "AWS_SECRET_ACCESS_KEY=${props['AWS_SECRET_ACCESS_KEY']}",
    "AWS_ACCESS_KEY_ID=${props['AWS_ACCESS_KEY_ID']}",
    "AWS_DEFAULT_REGION=${props['AWS_DEFAULT_REGION']}"
  ]
}
