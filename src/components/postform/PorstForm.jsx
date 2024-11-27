import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import RTEditor from "../RTEditor.jsx";
import SelectOption from "../SelectOption.jsx";
import PostService from "../../appwrite/post-service.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authobj from "../../appwrite/auth-service.js";
function PorstForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.user.userdata);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await PostService.uploadfile(data.image[0]) : null;
      if (file) {
        PostService.deletefile(post.featuredimage);
      }
      data.featuredimage=file ? file.$id : post.featuredimage;
      data.slug = post?.$id;
      const updatedpost = await PostService.updatepost({
        ...data,
      });
      if (updatedpost) {
        navigate(`/post/${updatedpost.$id}`);
      } else {
        alert("Failed to update post");
      }
    } else {
      // here is create a new post
      const file = data.image[0] ? await PostService.uploadfile(data.image[0]) : null;
      // update featuredimage change if
      data.featuredimage=file.$id;
      const newpost = await PostService.createpost({
        ...data,
        userid: userdata.$id,
      });
      if (newpost) {
        navigate(`/post/${newpost.$id}`);
      } else {
        alert("Failed to create post");
      }
    }
  };

  const slugtransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subcriptions = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugtransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subcriptions.unsubscribe();
    };
  }, [watch, slugtransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugtransform(e.target.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTEditor
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={PostService.getfile(post.featuredimage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <SelectOption
          option={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PorstForm;
