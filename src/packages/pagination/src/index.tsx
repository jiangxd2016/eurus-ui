import { defineComponent, computed } from 'vue';

import Icon from '../../icons';
import VPage from './VPage.vue';

import './style.scss';

const EPaginationProps = {
  pages: {
    type: Number,
    default: 0,
  },
  rangeSize: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  activeColor: {
    type: String,
    default: '#DCEDFF',
  },
  hideFirstButton: {
    type: Boolean,
    default: false,
  },
  hideLastButton: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EPagination',
  props: EPaginationProps,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // pagination
    const pagination = computed((): (number | null)[] => {
      const res = [];
      const minPaginationElems = 5 + props.rangeSize * 2;

      let rangeStart = props.pages <= minPaginationElems ? 1 : props.modelValue - props.rangeSize;
      let rangeEnd
        = props.pages <= minPaginationElems ? props.pages : props.modelValue + props.rangeSize;

      rangeEnd = rangeEnd > props.pages ? props.pages : rangeEnd;
      rangeStart = rangeStart < 1 ? 1 : rangeStart;

      if (props.pages > minPaginationElems) {
        const isStartBoundaryReached = rangeStart - 1 < 3;
        const isEndBoundaryReached = props.pages - rangeEnd < 3;

        if (isStartBoundaryReached) {
          rangeEnd = minPaginationElems - 2;
          for (let i = 1; i < rangeStart; i++) {
            res.push(i);
          }
        } else {
          res.push(1, null);
        }

        if (isEndBoundaryReached) {
          rangeStart = props.pages - (minPaginationElems - 3);
          for (let i = rangeStart; i <= props.pages; i++) {
            res.push(i);
          }
        } else {
          for (let i = rangeStart; i <= rangeEnd; i++) {
            res.push(i);
          }
          res.push(null, props.pages);
        }
      } else {
        for (let i = rangeStart; i <= rangeEnd; i++) {
          res.push(i);
        }
      }

      return res;
    });

    function updatePageHandler(params: number) {
      emit('update:modelValue', params);
    }

    // controls
    const isPrevControlsActive = computed((): boolean => {
      return props.modelValue > 1;
    });
    const isNextControlsActive = computed((): boolean => {
      return props.modelValue < props.pages;
    });

    function goToFirst(): void {
      if (isPrevControlsActive.value) {
        emit('update:modelValue', 1);
      }
    }
    function goToPrev(): void {
      if (isPrevControlsActive.value) {
        emit('update:modelValue', props.modelValue - 1);
      }
    }

    function goToLast(): void {
      if (isNextControlsActive.value) {
        emit('update:modelValue', props.pages);
      }
    }
    function goToNext(): void {
      if (isNextControlsActive.value) {
        emit('update:modelValue', props.modelValue + 1);
      }
    }

    return {
      pagination,
      updatePageHandler,
      isPrevControlsActive,
      isNextControlsActive,
      goToFirst,
      goToLast,
      goToPrev,
      goToNext,
    };
  },
  render() {
    return (
      <ul class="Pagination">
        {!this.hideFirstButton && (
          <li class="PaginationControl">
            <Icon name="pageFirst" class={{ 'Control-active': this.isPrevControlsActive, 'Control': true }} onClick={this.goToFirst} />
          </li>
        )
        }
        <li class="PaginationControl">
          <Icon name="chevronLeft" class={{ 'Control-active': this.isPrevControlsActive, 'Control': true }} onClick={this.goToPrev} />
        </li>
        {
          this.pagination.map((page) => {
            return (<VPage key="`pagination-page-${page}`" page={page} current={this.modelValue}
              active-color={this.activeColor} onUpdate={this.updatePageHandler}></VPage>
            );
          })
        }

        <li class="PaginationControl">
          <Icon name="chevronRight" class={{ 'Control-active': this.isNextControlsActive, 'Control': true }} onClick={this.goToNext} />
        </li>

        {!this.hideFirstButton && (
          <li class="PaginationControl">
            <Icon name="pageLast" class={{ 'Control-active': this.isNextControlsActive, 'Control': true }} onClick={this.goToLast} />
          </li>
        )
        }

      </ul>
    );
  }
});
