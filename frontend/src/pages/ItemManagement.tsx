import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import Container from "@/components/layout/Container";
import ItemSection from "@/components/layout/ItemSection";
import Spinner from "@/components/Buget/Spinner";
import Button from "@/components/Button/Button";
import PlusCirlce from "@/svg/PlusCircle";
import {
  useCreateItemCollectionMutation,
  useGetItemCollectionsQuery,
} from "@/redux/api/item-collection";

export default function ItemManagement() {
  const { data, isFetching, isLoading } = useGetItemCollectionsQuery();
  const [create] = useCreateItemCollectionMutation();

  const onClick = async () => {
    try {
      await create({ name: "New Section" }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaViewLayout>
      <StackLayout>
        <Container>
          <div className="md:px-10 flex flex-row justify-between items-center">
            <span className="font-bold text-2xl md:text-4xl text-white">
              Items
            </span>
            <Button
              SVG={PlusCirlce}
              text={"Add Section"}
              onClik={onClick}
              disabled={isFetching}
            />
          </div>
          {isLoading ? (
            <Spinner />
          ) : data?.data.length ? (
            <ItemSection data={data.data} />
          ) : (
            <div className="flex flex-col flex-1 justify-center items-center">
              <span className="text-white text-xl font-bold">
                There is no items!!!
              </span>
            </div>
          )}
        </Container>
      </StackLayout>
    </SafeAreaViewLayout>
  );
}
