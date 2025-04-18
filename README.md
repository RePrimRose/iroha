# IROHA
일본어 학습을 도와주는 웹 프로젝트입니다.

## 1. 프로젝트 개요
- 편하게 웹을 통해서 일본어 학습을 할 수 있게 하는 프로젝트입니다.
- 다양한 단어, 한자, 문장을 보면서 배우고 다양한 시험을 통해서 테스트를 진행합니다.

## 2. 기술 스택
- 백엔드: Spring Boot, JPA
- 데이터베이스: MySQL
- 인프라: Docker, AWS (EB, RDS, S3, CloudFront)
- CI/CD: GitHub Actions

## 3. 주요 기능
- JWT 기반 인증 시스템
- Spring Boot + JPA를 활용한 RESTful API 구축
- S3를 이용한 정적 파일 관리 및 CloudFront CDN을 활용한 빠른 정적 파일 제공
- GitHub Actions를 활용한 CI/CD 자동화
- Nginx를 리버스 프록시로 활용하여 API 요청 처리

## 4. ERD 설계
![ERD](https://github.com/user-attachments/assets/6abd03a8-4174-4c28-affb-accb9c701c94)

## 5. 시스템 아키텍처
![시스템 아키텍처](https://github.com/user-attachments/assets/e15b4e32-a531-4e2b-abaa-5382c2da0f94)

## 6. 실행 방법
```
git clone https://github.com/RePrimRose/iroha.git
cd ./iroha/frontend
npm install
npm run build
cd ..
docker compose up -d
```