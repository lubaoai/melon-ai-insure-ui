pipeline {
  agent {
    kubernetes {
      cloud 'study-kubernetes'
      slaveConnectTimeout 1200
      workspaceVolume hostPathWorkspaceVolume(hostPath: "/opt/workspace", readOnly: false)
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
    - args: [\'$(JENKINS_SECRET)\', \'$(JENKINS_NAME)\']
      image: 'registry.cn-hangzhou.aliyuncs.com/lubbaoai/inbound-agent:latest-jdk17'
      name: jnlp
      imagePullPolicy: IfNotPresent
      volumeMounts:
        - mountPath: "/etc/localtime"
          name: "localtime"
          readOnly: false
    - command:
        - "cat"
      env:
        - name: "LANGUAGE"
          value: "en_US:en"
        - name: "LC_ALL"
          value: "en_US.UTF-8"
        - name: "LANG"
          value: "en_US.UTF-8"
      image: "registry.cn-hangzhou.aliyuncs.com/lubbaoai/kubectl:self-1.17"
      imagePullPolicy: "IfNotPresent"
      name: "kubectl"
      tty: true
      volumeMounts:
        - mountPath: "/etc/localtime"
          name: "localtime"
          readOnly: false
    - command:
        - "cat"
      env:
        - name: "LANGUAGE"
          value: "en_US:en"
        - name: "LC_ALL"
          value: "en_US.UTF-8"
        - name: "LANG"
          value: "en_US.UTF-8"
      image: "registry.cn-hangzhou.aliyuncs.com/lubbaoai/docker:19.03.9-git"
      imagePullPolicy: "IfNotPresent"
      name: "docker"
      tty: true
      volumeMounts:
        - mountPath: "/etc/localtime"
          name: "localtime"
          readOnly: false
        - mountPath: "/var/run/docker.sock"
          name: "dockersock"
          readOnly: false
  restartPolicy: "Never"
  nodeSelector:
    build: "true"
  securityContext: {}
  volumes:
    - hostPath:
        path: "/var/run/docker.sock"
      name: "dockersock"
    - hostPath:
        path: "/usr/share/zoneinfo/Asia/Shanghai"
      name: "localtime"
    - name: "cachedir"
      hostPath:
        path: "/opt/m2"
'''
    }
}
  stages {
    stage('Pulling melon-ai-insure-ui Code') {
      parallel {
        stage('Pulling Code by Jenkins') {
          when {
            expression {
              env.gitlabBranch == null
            }
          }
          steps {
            echo "pulling melon-ai-insure-ui code begin"
            git(changelog: true, poll: true, url: 'git@192.168.191.136:melongroup/melon-ai-insure-ui.git', branch: "${BRANCH}", credentialsId: 'gitlab-key')
            script {
              COMMIT_ID = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
              TAG = BUILD_TAG + '-' + COMMIT_ID
              println "Current branch is ${BRANCH}, Commit ID is ${COMMIT_ID}, Image TAG is ${TAG}"
            }
            echo "pulling melon-ai-insure-ui code end"
          }
        }
        stage('Pulling melon-ai-insure-ui Code by trigger') {
          when {
            expression {
              env.gitlabBranch != null
            }
          }
          steps {
            git(url: 'git@192.168.191.136:melongroup/melon-ai-insure-ui.git', branch: env.gitlabBranch, changelog: true, poll: true, credentialsId: 'gitlab-key')
            script {
              COMMIT_ID = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
              TAG = BUILD_TAG + '-' + COMMIT_ID
              println "Current branch is ${env.gitlabBranch}, Commit ID is ${COMMIT_ID}, Image TAG is ${TAG}"
            }
          }
        }
      }
    }

    stage('Docker build for creating image') {
      environment {
        HARBOR_USER = credentials('HARBOR_USERNAME')
      }
      steps {
        container(name: 'docker') {
              sh """
                  echo ${HARBOR_USER_USR} ${HARBOR_USER_PSW} ${TAG}
                  pwd
                  ls -l
                  echo "logon harbor!"
                  docker login -u ${HARBOR_USER_USR} -p ${HARBOR_USER_PSW} ${HARBOR_ADDRESS}

                  echo "build for melon-ai-insure-ui image!"
                  docker build -t ${HARBOR_ADDRESS}/${REGISTRY_DIR}/${IMAGE_NAME}:${TAG} .

                  docker push ${HARBOR_ADDRESS}/${REGISTRY_DIR}/${IMAGE_NAME}:${TAG}
              """
        }
      }
    }
    stage('Deploying to K8s') {
      environment {
        MY_KUBECONFIG = credentials('study-kubernetes')
      }
	  when { expression { params.Deploy == "Deploy" } }
      steps {
        container(name: 'kubectl'){
          sh """
            echo "deploy start!"
			/usr/local/bin/kubectl --kubeconfig $MY_KUBECONFIG set image deploy -l app=melon-ai-insure-ui melon-ai-insure-ui=${HARBOR_ADDRESS}/${REGISTRY_DIR}/${IMAGE_NAME}:${TAG} -n $NAMESPACE
			echo "deploy end!"
          """
        }
      }
    }
  }
  environment {
    COMMIT_ID = ""
    HARBOR_ADDRESS = "192.168.191.135"
    REGISTRY_DIR = "melon-poc"
    NAMESPACE = "default"
    TAG = ""
    IMAGE_NAME = "melon-ai-insure-ui"
  }
  parameters {
    gitParameter(branch: '', branchFilter: 'origin/(.*)', defaultValue: 'master', description: 'Branch for build and deploy', name: 'BRANCH', quickFilterEnabled: false, selectedValue: 'NONE', sortMode: 'NONE', tagFilter: '*', type: 'PT_BRANCH')
	choice(name: 'Deploy', choices: ['Not Deploy', 'Deploy'], description: 'Deploy or Not')
  }
}
