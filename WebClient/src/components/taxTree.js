import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import { getTaxonomyData } from '../api'; 
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const transformData = (data) => {
    const taxonomyMap = {};
    data.forEach((item) => {
        if (!taxonomyMap[item.kingdom]) {
          taxonomyMap[item.kingdom] = { 
            name: item.kingdom, 
            attributes: { 
              Taxa: "Kingdom", 
              "More Info": <Link href={`/Kingdom/${encodeURIComponent(item.kingdom)}`} underline="hover" >{`${item.kingdom} profile`}</Link> 
            }, 
            children: [] 
          };
        }
        
        const phylumNode = taxonomyMap[item.kingdom].children.find(child => child.name === item.phylum);
        if (!phylumNode) {
          taxonomyMap[item.kingdom].children.push({ 
            name: item.phylum, 
            attributes: { 
              Taxa: "Phylum", 
              "More Info": <Link href={`/Phylum/${encodeURIComponent(item.phylum)}`} underline="hover">{`${item.phylum} profile`}</Link> 
            }, 
            children: [] 
          });
        }

        const classNode = taxonomyMap[item.kingdom].children.find(child => child.name === item.phylum).children.find(child => child.name === item.class);
        if (!classNode) {
          taxonomyMap[item.kingdom].children.find(child => child.name === item.phylum).children.push({ 
            name: item.class, 
            attributes: { 
              Taxa: "Class", 
              "More Info": <Link href={`/Class/${encodeURIComponent(item.class)}`} underline="hover">{`${item.class} profile`}</Link> 
            }, 
            children: [] 
          });
        }

        const orderNode = taxonomyMap[item.kingdom].children.find(child => child.name === item.phylum).children.find(child => child.name === item.class).children.find(child => child.name === item.order);
        if (!orderNode) {
          taxonomyMap[item.kingdom].children.find(child => child.name === item.phylum).children.find(child => child.name === item.class).children.push({ 
            name: item.order, 
            attributes: { 
              Taxa: "Order", 
              "More Info": <Link href={`/Order/${encodeURIComponent(item.order)}`} underline="hover">{`${item.order} profile`}</Link> 
            }, 
            children: [] 
          });
        }

        const familyNode = taxonomyMap[item.kingdom].children.find(child => child.name === item.phylum).children.find(child => child.name === item.class).children.find(child => child.name === item.order).children.find(child => child.name === item.family);
        if (!familyNode) {
          taxonomyMap[item.kingdom].children.find(child => child.name === item.phylum).children.find(child => child.name === item.class).children.find(child => child.name === item.order).children.push({ 
            name: item.family, 
            attributes: { 
              Taxa: "Family", 
              "More Info": <Link href={`/Family/${encodeURIComponent(item.family)}`} underline="hover">{`${item.family} profile`}</Link> 
            }, 
            children: [] 
          });
        }

        const genusNode = taxonomyMap[item.kingdom].children.find(child => child.name === item.phylum).children.find(child => child.name === item.class).children.find(child => child.name === item.order).children.find(child => child.name === item.family).children.find(child => child.name === item.genus);
        if (!genusNode) {
          taxonomyMap[item.kingdom].children.find(child => child.name === item.phylum).children.find(child => child.name === item.class).children.find(child => child.name === item.order).children.find(child => child.name === item.family).children.push({ 
            name: item.genus, 
            attributes: { 
              Taxa: "Genus", 
              "More Info": <Link href={`/Genus/${encodeURIComponent(item.genus)}`} underline="hover">{`${item.genus} profile`}</Link> 
            }, 
            children: [] 
          });
        }

        taxonomyMap[item.kingdom].children.find(child => child.name === item.phylum).children.find(child => child.name === item.class).children.find(child => child.name === item.order).children.find(child => child.name === item.family).children.find(child => child.name === item.genus).children.push({
          name: item.common_name, 
          attributes: { 
            "Scientific Name": item.scientific_name, 
            Taxa: "Species", 
            "More Info": <Link href={`/Species/${encodeURIComponent(item.genus + "_" + item.species)}`} underline="hover">{`${item.common_name} profile`}</Link>, 
            Origin: item.origin 
          }
        });
    });
    return Object.values(taxonomyMap);
};


const TaxonomyTree = () => {
  const [treeData, setTreeData] = useState(null);  
  const [loading, setLoading] = useState(true);   
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight }); 
  const [selectedPath, setSelectedPath] = useState([]); 
  const [translate, setTranslate] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 4 });
  const [selectedNodeName, setSelectedNodeName] = useState(''); 
  const originOptions = ["Native", "Non-Native", "Invasive"];
  const [filterValues, setFilterValues] = useState(originOptions);
  const treeContainerRef = useRef(null); 
  const treeRef = useRef(null); 
  
  useEffect(() => {
    document.title =  "Taxonomy tree - FisheriesIQ";
  });

  useEffect(() => {
    const fetchTaxonomyData = async (filterValues) => { 
      try {
        const response = await getTaxonomyData(); 
        const transformedData = transformData(response); 
        setTreeData(transformedData); 
      } catch (error) {
        console.error('Error fetching taxonomy data:', error);
      } finally {
        setLoading(false); 
      }
    };
    fetchTaxonomyData(filterValues);

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setTranslate({ x: window.innerWidth / 2, y: window.innerHeight / 4 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  const onNodeClick = (nodeData) => {
    const path = [];
    let currentNode = nodeData;

    while (currentNode) {
      path.unshift({
        name: currentNode.data.name,
        nodeData: currentNode
      });  
      currentNode = currentNode.parent;
    }
    setSelectedPath(path);
    
    setSelectedNodeName(nodeData.data.name); 
  };

  const handleBreadcrumbClick = (nodeData) => {
    if (nodeData) {
      const x = -nodeData.x + dimensions.width / 2;
      const y = -nodeData.y + dimensions.height / 4;
      setTranslate({ x, y });
    }
  };

  const handleFilterChange = (event, newValue) => {
    setFilterValues(newValue);
  };

  return (
    <div id="treeWrapper" ref={treeContainerRef} style={{ width: '100%', height: '100vh' }}>
      

      <div style={{ width: '100%', height: '90vh' }}>
        {loading ? (
          <p>Loading taxonomy data...</p>
        ) : treeData ? (
          <>
            <Tree
              ref={treeRef} 
              data={treeData}
              pathFunc="step"
              orientation="vertical"
              collapsible={true}
              enableLegacyTransitions={true}
              initialDepth={1}
              dimensions={dimensions}  
              centeringTransitionDuration={500}  
              translate={translate}  
              separation={{ siblings: 2, nonSiblings: 3 }}
              shouldCollapseNeighborNodes={true}
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
              onNodeClick={onNodeClick}  
            />
          </>
        ) : (
          <p>No taxonomy data available.</p>
        )}
      </div>

      {selectedPath.length > 0 && (
        <Breadcrumbs aria-label="breadcrumb">
          {selectedPath.map((nodeObj, index) => (
            <Link
              key={index}
              onClick={() => handleBreadcrumbClick(nodeObj.nodeData)}
              color="inherit"
              style={{ cursor: 'pointer' }}
            >
              {nodeObj.name}
            </Link>
          ))}
        </Breadcrumbs>
      )}
    </div>
  );
};

export default TaxonomyTree;
