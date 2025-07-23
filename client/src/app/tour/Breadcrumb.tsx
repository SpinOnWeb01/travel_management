import Link from "next/link";

type BreadcrumbProps = {
  title: string;
  categor_name?: string;
};

export default function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <div className="breadcrumb-wrap">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul className="breadcrumb-list d-flex align-items-center gap-2 flex-wrap mb-0">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>
              </li>
              <li>
                <Link href="/tour">Tour Grids</Link>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>
              </li>
              <li className="active">
                <span>{title}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
