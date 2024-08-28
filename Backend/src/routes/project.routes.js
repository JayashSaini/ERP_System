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
  toggleCompleteTask,
  toggleProjectCompleted,
  searchProjects,
} = require('../controllers/project.controllers');
const { validate } = require('../validators/validate');
const {
  createProjectValidator,
  updateProjectValidator,
  taskValidator,
} = require('../validators/project.validators');
const {
  mongoIdPathVariableValidator,
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
    verifyPermission([
      UserRolesEnum.PROJECT_MANAGER,
      UserRolesEnum.ADMIN,
      UserRolesEnum.TEAM_LEADER,
    ]),
    createProjectValidator(),
    validate,
    createProject
  );

router.route('/search').get(searchProjects);

router
  .route('/:projectId')
  .get(mongoIdPathVariableValidator('projectId'), validate, getProjectById)
  .patch(
    upload.fields([
      {
        name: 'projectImage',
        maxCount: 1,
      },
      {
        name: 'projectLogo',
        maxCount: 1,
      },
    ]),
    verifyPermission([
      UserRolesEnum.PROJECT_MANAGER,
      UserRolesEnum.ADMIN,
      UserRolesEnum.TEAM_LEADER,
    ]),
    mongoIdPathVariableValidator('projectId'),
    updateProjectValidator(),
    validate,
    updateProject
  );

router
  .route('/task/:projectId')
  .post(
    verifyPermission([
      UserRolesEnum.PROJECT_MANAGER,
      UserRolesEnum.ADMIN,
      UserRolesEnum.TEAM_LEADER,
    ]),
    mongoIdPathVariableValidator('projectId'),
    taskValidator(),
    validate,
    addTaskToProject
  );

router
  .route('/task/:projectId/:taskId')
  .patch(
    verifyPermission([
      UserRolesEnum.PROJECT_MANAGER,
      UserRolesEnum.ADMIN,
      UserRolesEnum.TEAM_LEADER,
    ]),
    mongoIdPathVariableValidator('projectId'),
    mongoIdPathVariableValidator('taskId'),
    validate,
    toggleCompleteTask
  )
  .delete(
    verifyPermission([
      UserRolesEnum.PROJECT_MANAGER,
      UserRolesEnum.ADMIN,
      UserRolesEnum.TEAM_LEADER,
    ]),
    mongoIdPathVariableValidator('projectId'),
    mongoIdPathVariableValidator('taskId'),
    validate,
    deleteTaskToProject
  );

router
  .route('/completed/:projectId')
  .patch(
    verifyPermission([
      UserRolesEnum.PROJECT_MANAGER,
      UserRolesEnum.ADMIN,
      UserRolesEnum.TEAM_LEADER,
    ]),
    mongoIdPathVariableValidator('projectId'),
    validate,
    toggleProjectCompleted
  );

module.exports = router;
