import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BrandService } from "./brands.services";

const createBrand = catchAsync(async (req, res) => {
  const result = await BrandService.createBrandIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Brand created successfully",
    data: result,
  });
});

const getAllBrands = catchAsync(async (req, res) => {
  const result = await BrandService.getAllBrandsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Brands fetched successfully",
    data: result,
  });
});

const getSingleBrand = catchAsync(async (req, res) => {
  const result = await BrandService.getSingleBrandFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Brand fetched successfully",
    data: result,
  });
});

const updateBrand = catchAsync(async (req, res) => {
  const result = await BrandService.updateBrandIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Brand updated successfully",
    data: result,
  });
});

const deleteBrand = catchAsync(async (req, res) => {
  const result = await BrandService.deleteBrandFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Brand deleted successfully",
    data: result,
  });
});

export const brandController = {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};
