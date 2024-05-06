#!/bin/sh

PROFILE=@PROFILE@
IMAGE_VERSION=@IMAGE_VERSION@
IMAGE_REPO_URL="809695185788.dkr.ecr.ap-southeast-2.amazonaws.com/"
IMAGE_APP_NAME="poc-miraen"
AWS_DEFAULT_REGION="ap-southeast-2"
AWS_ACCESS_KEY_ID=AKIA3ZBMYBN6AUIHP6IP
AWS_SECRET_ACCESS_KEY=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

aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}
aws configure set region ${AWS_DEFAULT_REGION}
aws configure set output text

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
sudo docker pull ${IMAGE_REPO_URL}${IMAGE_APP_NAME}:${IMAGE_VERSION}
sleep 5


danglingCnt=`sudo docker images -f dangling=true | grep -v grep -c`
if [ ${danglingCnt} -gt 1 ];
then
        sudo docker rmi $(sudo docker images -f "dangling=true" -q)
fi
