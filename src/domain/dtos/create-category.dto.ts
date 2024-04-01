export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: string,
    public readonly role: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false, role } = object;
    let availableBoolean = available;
    if (!name) {
      return ["missing name"];
    }
    if (!role) {
      return ["missing role"];
    }
    if (typeof availableBoolean !== "boolean") {
      availableBoolean = availableBoolean === "true";
    }

    return [undefined, new CreateCategoryDto(name, availableBoolean, role)];
  }
}
