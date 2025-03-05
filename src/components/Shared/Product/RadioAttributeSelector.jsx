import React from "react";
import Image from "next/image";
import { formatImagePath } from "@/utilities/lib/formatImagePath";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import { Radio } from "antd"; // Import Radio from Ant Design

const RadioAttributeSelector = ({
  groupedAttributes,
  selectedAttributes,
  handleAttributeSelect,
  item,
}) => {
  const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <>
      {groupedAttributes &&
        Object.entries(groupedAttributes).map(([attributeName, options]) => (
          <div key={attributeName} className="flex flex-col gap-4 my-4">
            <span className="font-bold">
              {attributeName} :{" "}
              {attributeName === "Color" ? "(কালার সিলেক্ট করুন)" : ""}
            </span>
            <div className="flex flex-col gap-2">
              {options.map((option) => {
                const variantWithImage = item?.variants.find((variant) =>
                  variant.attributeCombination.some(
                    (attr) =>
                      attr.attribute.name === attributeName &&
                      attr.name === option.name
                  )
                );

                const isSelected =
                  selectedAttributes[attributeName] === option.name;

                const borderColor =
                  attributeName.toLowerCase() === "color"
                    ? isSelected
                      ? option.label
                      : "#D1D5DB"
                    : isSelected
                    ? globalData?.results?.primaryColor
                    : "#D1D5DB";

                return (
                  <div
                    key={option._id}
                    title={option.name}
                    className="flex flex-col bg-primaryLight p-2 rounded lg:w-1/2"
                  >
                    <label
                      htmlFor={`attribute-${attributeName}-${option._id}`}
                      className="flex items-center cursor-pointer gap-5"
                    >
                      <Radio
                        id={`attribute-${attributeName}-${option._id}`}
                        name={attributeName}
                        value={option.name}
                        checked={isSelected}
                        onChange={() =>
                          handleAttributeSelect(attributeName, option.name)
                        }
                        className="mb-2"
                      />
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          padding: "0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "all 0.3s ease",
                          border: `3px solid ${borderColor}`,
                        }}
                      >
                        {attributeName.toLowerCase() === "color" &&
                        variantWithImage?.image ? (
                          <Image
                            src={formatImagePath(variantWithImage.image)}
                            alt={option.name}
                            width={40}
                            height={40}
                            style={{
                              borderRadius: "50%",
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        ) : attributeName.toLowerCase() === "color" ? (
                          <span
                            style={{
                              backgroundColor: option.label || "transparent",
                              display: "block",
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                          ></span>
                        ) : (
                          <span
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            {option.label}
                          </span>
                        )}
                      </div>
                      {attributeName.toLowerCase() === "color" && (
                        <p className="text-xs mt-2 font-medium">
                          {option?.name ?? "Color"}
                        </p>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </>
  );
};

export default RadioAttributeSelector;
