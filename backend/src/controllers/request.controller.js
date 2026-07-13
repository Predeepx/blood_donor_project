import * as requestService from
"../services/request.service.js";

export const createRequest =
async (req, res, next) => {
  try {
    const request =
      await requestService.createRequest(
        req.body,
        req.user.id
      );

    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

export const getAllRequests =
async (req, res, next) => {
  try {
    const requests =
      await requestService.getAllRequests();

    res.json(requests);
  } catch (error) {
    next(error);
  }
};

export const updateStatus =
async (req, res, next) => {
  try {
    const request =
      await requestService.updateRequestStatus(
        req.params.id,
        req.body.status
      );

    res.json(request);
  } catch (error) {
    next(error);
  }
};

export const deleteRequest =
async (req, res, next) => {
  try {
    await requestService.deleteRequest(
      req.params.id
    );

    res.json({
      message:
        "Request deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};