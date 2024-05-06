#!/bin/sh

PROFILE=@PROFILE@
IMAGE_VERSION=@IMAGE_VERSION@
IMAGE_REPO_URL=@IMAGE_REPO_URL@
IMAGE_APP_NAME=@IMAGE_APP_NAME@
AWS_DEFAULT_REGION=@AWS_DEFAULT_REGION@

sudo aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${IMAGE_REPO_URL}

sleep 1

if sudo docker ps -a | grep -q ${IMAGE_APP_NAME}; then
    sudo docker stop ${IMAGE_APP_NAME}
    sleep 1
    sudo docker rm -f ${IMAGE_APP_NAME}
    sleep 1
    if sudo docker images | grep -q ${IMAGE_APP_NAME}; then
        sudo docker rmi $(sudo docker images | grep ${IMAGE_APP_NAME} -q)
        docker rmi $(docker images --format "{{.ID}} {{.Repository}}" | grep ${IMAGE_APP_NAME} | awk '{print $1}')
    fi
fi
sleep 1

echo ${IMAGE_REPO_URL}/${IMAGE_APP_NAME}:${IMAGE_VERSION}
sudo docker pull ${IMAGE_REPO_URL}/${IMAGE_APP_NAME}:${IMAGE_VERSION}
sleep 5


danglingCnt=`sudo docker images -f dangling=true | grep -v grep -c`
if [ ${danglingCnt} -gt 1 ];
then
        sudo docker rmi $(sudo docker images -f "dangling=true" -q)
fi
