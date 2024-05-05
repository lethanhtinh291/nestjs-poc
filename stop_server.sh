#!/bin/sh

PROFILE=@PROFILE@
PROJ_NAME=@PROJ_NAME@
COMPANY_NAME=@COMPANY_NAME@
IMAGE_VERSION=@IMAGE_VERSION@
AWS_ACCOUNT_ID=@AWS_ACCOUNT_ID@
AWS_DEFAULT_REGION=@AWS_DEFAULT_REGION@
AWS_ACCESS_KEY_ID=@AWS_ACCESS_KEY_ID@
AWS_SECRET_ACCESS_KEY=@AWS_SECRET_ACCESS_KEY@

REPOSITORY_URL_TAG=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/private-ecr-${COMPANY_NAME}-${PROJ_NAME}:${PROFILE}_${IMAGE_VERSION}

aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}
aws configure set region ${AWS_DEFAULT_REGION}
aws configure set output text

sudo docker login -u AWS -p $(aws ecr get-login-password --region ${AWS_DEFAULT_REGION}) ${REPOSITORY_URL_TAG}
sleep 1

if sudo docker ps -a | grep -q ${PROJ_NAME}; then
    sudo docker stop ${PROJ_NAME}
    sleep 1
    sudo docker rm -f ${PROJ_NAME}
    sleep 1
    if sudo docker images | grep -q ${PROJ_NAME}; then
    	sudo docker rmi $(sudo docker images | grep ${PROJ_NAME} -q)
    	docker rmi $(docker images --format "{{.ID}} {{.Repository}}" | grep ${PROJ_NAME} | awk '{print $1}')
    fi
fi
sleep 1

sudo docker pull ${REPOSITORY_URL_TAG}
sleep 5


danglingCnt=`sudo docker images -f dangling=true | grep -v grep -c`
if [ ${danglingCnt} -gt 1 ];
then
        sudo docker rmi $(sudo docker images -f "dangling=true" -q)
fi
