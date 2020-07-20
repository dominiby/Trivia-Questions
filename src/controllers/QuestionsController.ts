import { Router } from 'express';
import { Question } from '../types/models';
import { successResponseJSON, errorResponseJSON } from '../utils/responses';

const questionsController = Router();

questionsController.post('/', async (req, res) => {
  console.log('POST /');
  console.log(req.body);

  const body: Question = req.body;
  const { answers, ...questionData } = body;

  try {
    const question = await req.context.models.Question.create({
      ...questionData,
      answers: [],
    });

    for (let i = 0; i < answers.length; i++) {
      await req.context.models.Answer.create({ ...answers[i], question: question.id });
    }

    return successResponseJSON(res, {
      question,
      message: 'Question successfully created',
    });
  } catch (error) {
    console.log(error);
    return errorResponseJSON(res);
  }
});

questionsController.get('/', async (req, res) => {
  console.log('GET /questions');

  try {
    const questions = await req.context.models.Question.find();
    console.log(questions);

    for (let i = 0; i < questions.length; i++) {
      const answers = await req.context.models.Answer.find({ question: questions[i].id });
      questions[i].answers = answers;
    }

    return res.send(questions);
  } catch (error) {
    console.log(error);
    return errorResponseJSON(res);
  }
});

questionsController.put('/:id', async (req, res) => {
  console.log('PUT /questions');

  const body: Question = req.body;
  console.log(body);
  const { answers, ...questionData } = body;

  try {
    const question = await req.context.models.Question.findById(req.params.id);
    await question?.update({ ...questionData });
    await question?.save();

    for (let i = 0; i < answers.length; i++) {
      const answer = await req.context.models.Answer.findById(answers[i].id);
      await answer?.update({ ...answers[i] });
      await answer?.save();
    }

    return successResponseJSON(res, {
      message: "Question successfully updated"
    });
  } catch (error) {
    console.log(error);
    return errorResponseJSON(res);
  }
});

questionsController.delete('/:id', async (req, res) => {
  console.log('DELETE /questions');

  const body: Question = req.body;
  console.log(body);

  try {
    const question = await req.context.models.Question.findById(req.params.id);
    await question?.deleteOne();

    return successResponseJSON(res, {
      message: "Question successfully deleted"
    });
  } catch (error) {
    console.log(error);
    return errorResponseJSON(res);
  }
});

export default questionsController;