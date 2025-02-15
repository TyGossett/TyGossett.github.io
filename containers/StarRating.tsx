import React, { useState} from 'react';
import { Card, CardBody, Container, Row, Col}  from 'reactstrap';
import StarCard from '../components/StarCard';
import { StarBox } from '../portfolio';
import Fade from 'react-reveal/Fade';

const StarRating = () => {
    const [ratings, setRatings] = useState<number[]>(new Array(StarBox.length).fill(0));
    const [allAnswered, setAllAnswered] = useState<boolean>(false);
    const [answeredCount, setAnsweredCount] = useState<number>(0);


    const handleRatingChange = (questionIndex: number, value: number) => {
      setRatings(prevRatings => {
        const newRatings = [...prevRatings];
        if (newRatings[questionIndex] === 0) {
          setAnsweredCount(prevCount => prevCount + 1);
        }
        newRatings[questionIndex] = value;
  
        if (answeredCount === StarBox.length - 1) {
          setAllAnswered(true);
        }
  
        return newRatings;
      });
    };

      // Check if all questions have been answered
     // if (!allAnswered && ratings.reduce((ra) => rating > 0)) {
     //   setAllAnswered(true);
     // }
    //};

    const ResultCard = () => {
      const totalScore = ratings.reduce((acc, curr) => acc + curr, 0);

      let resultText = "";
  
      if (totalScore <= 5) {
        resultText = "Little Match: Despite a slight misalignment, our combined perspectives can lead to creative breakthroughs! Let's embark on an exciting journey of discovery. Contact me below.";
      } else if (totalScore <= 10) {
        resultText = "Moderate Match: Our shared values lay the groundwork for a successful collaboration with room to grow. Let's join forces and make a meaningful impact. Contact me below.";
      } else if (totalScore <= 15) {
        resultText = "Good Match: We've got a strong match! Together, we can create an inspiring and energizing work experience. Let's make great things happen. Contact me below.!";
      } else {
        resultText = 'Perfect Match: Explore our seemless synergy and lets success unfold! Contact me below!'
      }
  
      return (
        <Fade left duration={2000}>
          <Card className="card-lift-hover shadow mt-4">
            <CardBody>
              <div className="d-flex px-3">
                <div className="pl-4">
                  <h5 className="text-info">Total Stars: {totalScore}</h5>
                  <h5 className="text-info">{resultText}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Fade>
      );
    };

    return (
      StarBox && (
        <section className="section pb-0 bg-gradient-info my-5">
          <Container>
            <div className="d-flex px-3">
              <div>
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                  <i className="ni ni-books text-info" />
                </div>
              </div>
              <div className="pl-4">
                <h4 className="display-3 text-white">Star Card</h4>
              </div>
            </div>
            <Row className="row-grid align-items-center">
              {StarBox.map((question, index) => {
                return (
                  <Col className="order-lg-1" lg="6" key={index}>
                    <StarCard
                    question={question}
                    onRatingChange={(value) =>handleRatingChange(index, value)}
                    />
                  </Col>
                );
              })}
            </Row>
            {allAnswered && <ResultCard />}
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100 star-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0">
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      )
    );
  };
  
  export default StarRating;