export const useCategoryActions = () => {
  const addCategory = async (category: string, userId: string) => {
    try {
      const response = await fetch("/api/words/categories", {
        method: "POST",
        body: JSON.stringify({ category, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteCategory = async (category: string, userId: string) => {
    try {
      const response = await fetch("/api/words/categories", {
        method: "DELETE",
        body: JSON.stringify({ category, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const assignCategory = async (
    category: string,
    sentenceId: string,
    userId: string
  ) => {
    try {
      const response = await fetch("/api/words/updateCategory", {
        method: "POST",
        body: JSON.stringify({ category, sentenceId, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to assign category");
      }

      console.log("Category assigned successfully", response);
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromCategory = async (
    sentence: string,
    choosedCategory: string
  ) => {
    try {
      const response = await fetch("api/words/updateCategory", {
        method: "DELETE",
        body: JSON.stringify({ sentence, choosedCategory }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove from category");
      }

      console.log("Removed from category!");
    } catch (e) {
      console.error(e);
    }
  };

  return { addCategory, deleteCategory, assignCategory, removeFromCategory };
};
