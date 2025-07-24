import React, { useRef } from 'react'
import CountDown from './CountDown';
// import './DetailQuiz.scss'
const RightContent = (props) => {
    const{dataQuiz} = props;
    const refDiv= useRef([])
    const onTimeUp = () =>{
      props.handleFinishQuiz()
    }
    const getClassQuestion = (index,question) =>{
      if(question && question.answers && question.answers.length > 0){
        let isAnswered = question.answers.find(a=>a.isSelected===true)
        if(isAnswered){
          return 'question selected'
        }
      }
      return 'question'
    }

    const handleClickQuestion = (question,index) =>{
      if(refDiv.current){
        refDiv.current.forEach((item)=>{
           if(item && item.className === 'question clicked'){
              item.className = 'question'
           }

        })
      }

      if(question && question.answers && question.answers.length > 0){
        let isAnswered = question.answers.find(a=>a.isSelected===true)
        if(isAnswered){
          return;
        }
      }

      refDiv.current[index].className="question clicked"
      props.setIndex(index)
    }
  return (
    <div>
        <div className='main-timer'>
                    <CountDown onTimeUp={onTimeUp}/>
        </div>
        <div className='main-question'>
            
            {dataQuiz && dataQuiz.length > 0 &&
            dataQuiz.map((item,index)=>{
               return(
                <div key={`question-abc-${index}`} className={getClassQuestion(index,item)}
                onClick={()=>{handleClickQuestion(item,index)}}
                ref={element => refDiv.current[index]=element}
                >{index+1}</div>
               )
            })
            }
            
            </div>
    </div>
  )
}

export default RightContent
