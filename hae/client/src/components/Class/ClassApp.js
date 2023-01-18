import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Figure from 'react-bootstrap/Figure' ;
import Card from 'react-bootstrap/Card';

function ClassApp() {
    const page = '클래스 신청 페이지';
  return (
  <div><h3>{page}</h3>
  
  <figure className='figure' style={{ maxWidth: '22rem' }}> {/* 사진 올리는 문구 */}   
      <img
        src='https://mdbootstrap.com/img/new/standard/city/041.webp'
        className='figure-img img-fluid rounded shadow-3 mb-3'
        alt='...'
      />
      <figcaption className='figure-caption'>의류 리폼 클래스</figcaption>
  </figure>

    <p>유형 : 기초교육</p>
    <p>일자 : 월~토</p>
    <p>시간 : 시간표 표기</p>
    <p>모집기간 : 상시모집</p>

    <p>1.교육 주제 : 청바지 리폼하기</p>
    <p>2.교육 내용 : 청바지 기초 리폼 수업 후 각자 의류 간단히 리폼해보기</p>
    <p>3.교육 강사 : 백석현 (리폼경력 2년)</p>
    <p>4.교육 일시 : 시간표 표기</p>
    <p>5.교육 장소 : 대구가톨릭대학교 d2 553호</p>
    <p>6.가격 정보 : 공지 참조</p>

  <br />
  <Button variant="outline-info">신 청</Button>
  </div>
  );
}

export default ClassApp