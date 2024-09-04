const { Router } = require('express');
const {
  verifyJWT,
  verifyPermission,
} = require('../middlewares/auth.middlewares');
const {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  addTaskToProject,
  deleteTaskToProject,
  searchProjects,
  setProjectStatus,
  updateLogo,
  setTaskStatus,
  updateTaskInProject,
  updateTaskAssignee,
} = require('../controllers/project.controllers');
const { validate } = require('../validators/validate');
const {
  createProjectValidator,
  updateProjectValidator,
  taskValidator,
  addTaskValidator,
  updateTaskValidator,
} = require('../validators/project.validators');
const {
  mongoIdPathVariableValidator,
  mongoIdRequestBodyValidator,
} = require('../validators/mongodb.validators');
const { UserRolesEnum } = require('../constants');
const { upload } = require('../middlewares/multer.middlewares');
const router = Router();

router.use(verifyJWT);

router
  .route('/')
  .get(getAllProjects)
  .post(
    upload.fields([
      {
        name: 'projectImage',
        maxCount: 1,
      },
    ]),
    verifyPermission([UserRolesEnum.PROJECT_MANAGER, UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validate,
    createProject
  );

router.route('/search').get(searchProjects);

router
  .route('/:projectId')
  .get(mongoIdPathVariableValidator('projectId'), validate, getProjectById)
  .patch(
    verifyPermission([UserRolesEnum.PROJECT_MANAGER, UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator('projectId'),
    updateProjectValidator(),
    validate,
    updateProject
  );

router
  .route('/logo/:projectId')
  .patch(
    verifyPermission([UserRolesEnum.PROJECT_MANAGER, UserRolesEnum.ADMIN]),
    upload.single('projectLogo'),
    mongoIdPathVariableValidator('projectId'),
    validate,
    updateLogo
  );

router
  .route('/task/:projectId')
  .post(
    verifyPermission([UserRolesEnum.PROJECT_MANAGER, UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator('projectId'),
    mongoIdRequestBodyValidator('assignee'),
    addTaskValidator(),
    validate,
    addTaskToProject
  );

router
  .route('/task/:projectId/:taskId')
  .post(
    verifyPermission([UserRolesEnum.PROJECT_MANAGER, UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator('projectId'),
    mongoIdPathVariableValidator('taskId'),
    updateTaskValidator(),
    validate,
    updateTaskInProject
  );

router
  .route('/task/:projectId/:taskId')
  .patch(
    verifyPermission([UserRolesEnum.PROJECT_MANAGER, UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator('projectId'),
    mongoIdPathVariableValidator('taskId'),
    validate,
    setTaskStatus
  )
  .delete(
    verifyPermission([UserRolesEnum.PROJECT_MANAGER, UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator('projectId'),
    mongoIdPathVariableValidator('taskId'),
    validate,
    deleteTaskToProject
  );

router
  .route('/task/assign/:projectId/:taskId')
  .patch(
    verifyPermission([UserRolesEnum.PROJECT_MANAGER, UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator('projectId'),
    mongoIdPathVariableValidator('taskId'),
    validate,
    updateTaskAssignee
  );
router
  .route('/status/:projectId')
  .patch(
    verifyPermission([UserRolesEnum.PROJECT_MANAGER, UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator('projectId'),
    validate,
    setProjectStatus
  );

module.exports = router;
