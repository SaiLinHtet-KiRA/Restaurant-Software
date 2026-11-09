import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import Container from "@/components/layout/Container";
import ItemSection from "@/components/layout/ItemSection";
import Spinner from "@/components/Buget/Spinner";
import EmptyState from "@/components/Buget/EmptyState";
import Button from "@/components/Button/Button";
import PlusCirlce from "@/svg/PlusCircle";
import Plate from "@/svg/Plate";
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
          <div className="flex flex-row items-center justify-between gap-3">
            <span className="page-title text-white">Items</span>
            <Button
              SVG={PlusCirlce}
              text={"Add Section"}
              onClik={onClick}
              disabled={isFetching}
            />
          </div>
          {isLoading ? (
            <Spinner className="text-white" />
          ) : data?.data.length ? (
            <ItemSection data={data.data} />
          ) : (
            <EmptyState
              SVG={Plate}
              text="There are no items yet"
              subtitle="Tap Add Section above to create your first menu section."
              className="text-white/90"
            />
          )}
        </Container>
      </StackLayout>
    </SafeAreaViewLayout>
  );
}
